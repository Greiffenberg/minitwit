import pymongo
import re
from pprint import pprint

# Making a connection with the database
client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
db = client["dev_db_minitwit"]
tweets = db["Message"]

# User input
functionInput = input('Enter flagtool argument: ')

# Dictionary mapping to a number to use in switch
dictionary = {
    'help': 0,
    'showAll': 1,
    'id': 2
}

def main(arg, keyword):
    switcher = {
        0: "Argument options:\n 'help', 'showAll', 'id + <your keyword>'",
        1: show_all(),
        2: flag_keyword(keyword)
    }
    return switcher.get(arg, "Argument options:\n 'help', 'showAll', 'id + <your keyword>'")

# Finds everything in the collection
def show_all():
    returncol = []
    for tweet in tweets.find():  # Finds all because no parameters are given
        returncol.append(tweet)

    if len(returncol) == 0:
        return 'There are no messages in the collection'
    else:
        return returncol

# Flagging all the tweets containing the keyword
def flag_keyword(keyword):
    if keyword == '': return

    mycol = tweets.find({"text": re.compile(keyword, re.IGNORECASE)}, {"_id": 1})
    count = 0

    for tweetID in mycol:
        tweets.update_one({"_id": tweetID.get('_id')}, {"$set": {"flagged": "true"}})
        count += 1

    if count > 0:
        print('Successfully updated all messages with keyword: ' + keyword)
    else:
        print('Did not find any matches')

# Handles the input from the user
if functionInput != '':
    if __name__ == '__main__':
        if functionInput[0:2] == 'id':
            main(dictionary.get(functionInput[0:2]), functionInput[3:])
        else:
            pprint(main(dictionary.get(functionInput), ''))
