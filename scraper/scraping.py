# Author: Adrian Melendrez
# Class: Cs 361
# Project: Microservice Wikipedia Image Scrapper
# Description: User calls python file with subject parameter
# A Wikipedia Link to an image of the subject is returned.
# Outputs the image link and writes this link in imageLinks.txt
# Note: sometimes it requries the following:
# subject_(What is it) =>  python_(programming language)
# firstName_lastName   =>  Abraham_Lincoln
# city_state           =>  Irvine_California
# name_name_name       =>  Cabo_San_Lucas
from xml.dom.minidom import Element
from matplotlib import image
from numpy import imag
import requests
from bs4 import BeautifulSoup
import webbrowser 
import sys
import time
import signal

def getImage(url):
    """ 
    GET Function that gets request from url provided
    returns html text of this request
     """
    r = requests.get(url)
    return r.text


def findAndSendImage(subject):
    """ Function that appends wikipedia image links to imageLinks.txt """
    answer = '1'

    while answer == '1':
        url = f"https://en.wikipedia.org/wiki/{subject}"

        htmlImage = getImage(url)

        # BeautifulSoup scans through html text for Image tag. 
        imageList = BeautifulSoup(htmlImage, 'html.parser')
        
        #iterate through all the images
        # append result to imageLinks.txt
        i = 0
        image_success = None
        for imageLink in imageList.find_all('img'):
            #print(imageLink.get('width'))
            try:
                #get the source of the enlarged image
                #requires removal of some characters
                image = imageLink['src']
                for j in reversed(image):
                    if j == '/':
                        image = image[:-1]
                        break
                    else:
                        image = image[:-1]
                image = image.replace("thumb/","")

                #image type
                image_type = image[-3:]
                if (i == 0) and (image_type == 'jpg' or image_type == 'JPG'):
                    with open('imageLinks.txt', 'a') as f:
                        f.write(f"{subject}: ")
                        f.write("https:")
                        f.write(image)
                        f.write("\n")
                        image_success = image
                        f.close()    
                        i += 1
            except TypeError:
                print("Sorry, no image available")
                break

        if image_success == None:
            print("Input produced no results\n")
        else:
            print("Image Found!\n")

        print(image_success)
        sys.stdout.flush()
        return image_success
  


#driver
history = []
while (1): 
    image_element = []
    with open('requestLinks.txt', 'r') as f:
        image_element = f.read()

    if not image_element:
        print("waiting . . .")
        time.sleep(5)
        continue
    if image_element not in history:
        findAndSendImage(image_element)
        history.append(image_element)
    else:
        print("waiting . . .")
        time.sleep(5)
        continue
    
    #Control- C terminates program with handler
    def handler(signmum, frame):
        print("scraping.py closed")
        exit(1)
    signal.signal(signal.SIGINT, handler)
