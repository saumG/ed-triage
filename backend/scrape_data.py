import requests
from bs4 import BeautifulSoup
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time


WORKER_URL = 'https://d1-ed.saumster123.workers.dev/'
# WORKER_URL = 'http://localhost:8787/'

def insert_into_d1(id, name, wait_time, directions, website):
    url = "https://d1-ed.saumster123.workers.dev/api/hospitals" 
    # url = "http://localhost:8787/api/hospitals" 
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "id": id,
        "name": name,
        "wait_time": wait_time,
        "directions": directions,
        "website": website
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        print(f"Inserted {name} successfully")
    else:
        print(f"Failed to insert {name}")

def scrape_wait_times():
    driver = webdriver.Chrome()

    url = 'https://www.edwaittimes.ca/'
    driver.get(url)

    search = driver.find_element(By.TAG_NAME, value="input")
    search.send_keys("Jericho Beach")
    
    time.sleep(5)
    
    search.send_keys(Keys.RETURN)
    
    time.sleep(5)
    
    for i in range(6):
        print(i)
        outerList = driver.find_element(By.TAG_NAME, value="ol")
        innerLIs = outerList.find_elements(By.TAG_NAME, value="li")
        showMore = innerLIs[-1]
        showMore.click()
        time.sleep(2)
    
    edwt_containers = driver.find_elements(By.CSS_SELECTOR, value=".\\@container")
    print(len(edwt_containers))
    
    for i, container in enumerate(edwt_containers):
        name = container.find_element(By.TAG_NAME, value="h3").text
        
        try:
            parent_div = container.find_element(By.CSS_SELECTOR, ".text.flex.items-center.text-right.text-2xl.font-bold.text-blue .flex.gap-1")
            spans = parent_div.find_elements(By.TAG_NAME, "span")
            wait_str = " ".join([span.text for span in spans])
        except Exception as e:
            wait_str = "Contact for Wait Times"
        
        link_elems = container.find_elements(By.TAG_NAME, value="a")
        links = [elem.get_attribute('href') for elem in link_elems]
            
        directions = links[0]
        website = links[1]
        
        print(i, name, wait_str, directions, website)
        insert_into_d1(str(i), name, wait_str, str(directions), str(website))
        
        time.sleep(1)

    time.sleep(5)

    driver.quit()



if __name__ == '__main__':
    scrape_wait_times()
