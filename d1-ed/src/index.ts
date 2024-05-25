/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);
		console.log(pathname);

		// Handle preflight OPTIONS request
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (pathname === '/api/hospitals' && request.method === 'POST') {
			try {
				const body = await request.json();
				console.log('Received body:', body);
				const { id, name, wait_time, directions, website }: any = body;

				const query = `INSERT INTO ed_tbl (id, hospital_name, wait_time, directions, website) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET hospital_name = excluded.hospital_name, wait_time = excluded.wait_time, directions = excluded.directions, website = excluded.website`;
				console.log('Executing query:', query);
				console.log('With parameters:', id, name, wait_time, directions, website);

				const result = await env.DB.prepare(query).bind(id, name, wait_time, directions, website).run();

				console.log('Query result:', result);

				return new Response('Hospital data inserted successfully', {
					status: 200,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type',
					},
				});
			} catch (error) {
				console.error('Error inserting data:', error);
				return new Response('Failed to insert hospital data', { status: 500 });
			}
		}

		if (pathname === '/api/hospitals' && request.method === 'GET') {
			try {
				const query = `SELECT * FROM ed_tbl;`;

				console.log('Executing query:', query);

				const result = await env.DB.prepare(query).all();

				console.log('Query result:', result);

				return new Response(JSON.stringify(result.results), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type',
					},
					status: 200,
				});
			} catch (error) {
				console.error('Error fetching data:', error);
				return new Response('Failed to fetch hospital data', { status: 500 });
			}
		}

		return new Response('Call /api/hospitals with POST to insert data', { status: 400 });
	},
} satisfies ExportedHandler<Env>;
