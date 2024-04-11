from IPython.display import Image, display
import matplotlib.pyplot as plt
import os
import re
import easyocr
import firebase_admin
from firebase_admin import credentials, db
import datetime

#Seperate venv for python run

def my_function_ocr():
    # Initialize firebase admin SDK with your Firebase project credentials
    cred = credentials.Certificate(
        r"C:\Users\abedi\Downloads\College TU856 DT228\College Year 4\Final Year Project\Codes\Parking-Management\anpr-data-firebase-adminsdk-w26xb-2441736885.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://anpr-data-default-rtdb.europe-west1.firebasedatabase.app'
    })

    # directory containing images
    images_directory = r"C:\Users\abedi\Downloads\College TU856 DT228\College Year 4\Final Year Project\Codes\UI_code\plate_folder"

    # list all the files in the directory
    image_files = os.listdir(images_directory)

    # Filter out only the image files
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
    image_files = [file for file in image_files if os.path.splitext(
        file)[1].lower() in image_extensions]

    # Display all the images
    for image_file in image_files:
        image_path = os.path.join(images_directory, image_file)
        display(Image(filename=image_path))

    reader = easyocr.Reader(['en'])

    # Regular expression to match alphanumeric characters
    alphanumeric_regex = re.compile('[a-zA-Z0-9]+')

    # Firebase Database
    # Get a reference to the Realtime Database
    db_ref = db.reference('image_text_output')

    # Delete previous database push
    db_ref.delete()

    # Loop through each image file
    for image_file in image_files:
        # Check if the file is an image
        if image_file.endswith(('png', 'jpg', 'jpeg', 'gif', 'bmp')):
            image_path = os.path.join(images_directory, image_file)

            # Perform OCR on the image
            result = reader.readtext(image_path)

            # # Store the detected text in a list
            # detected_text = [detection[1] for detection in result]

            # Combine the detected text into a single string and filter out only alphanumeric characters
            detected_text = ' '.join(
                [''.join(alphanumeric_regex.findall(detection[1])) for detection in result])

            # Get the current date and time
            current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            # Print the image file name and detected text
            print(f"Image File: {image_file}")
            print(f"Detected Text: {detected_text}")

            # Push the detected text to the Firebase Realtime Database
            db_ref.push({
                'image_file': image_file,
                'detected_text': detected_text,
                'image_taken_time': current_time
            })

    # Print a message indicating that all files and detected text have been pushed to Firebase
    print("All files, detected text, and image taken time have been pushed to Firebase.")


if __name__ == "__main__":
    my_function_ocr()
