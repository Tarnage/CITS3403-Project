import random
import json

# TODO pick words that will score points eg 16 four letter words 10 five letter words etc.. not all words will score points

VOWS        = "aeiou"
WORDS       = "./anagram.txt"
MAX_LETTERS = 9
KEYS        = { 4: "four",
                5: "five",
                6: "six",
                7: "seven",
                8: "eight",
                9: "nine"}

# holds all words
word_dic = {
            "nine": list(),
            "eight" : list(),
            "seven" : list(),
            "six"   : list(),
            "five"  : list(),
            "four"  : list()
            }

# build the anagrams for the target word
target_anagrams = {
            "root_word": list(),
            "root_letter": list(),
            "nine"  : list(),
            "eight" : list(),
            "seven" : list(),
            "six"   : list(),
            "five"  : list(),
            "four"  : list()
            }


def re_init_target():
    return {
            "root_word": list(),
            "root_letter": list(),
            "nine"  : list(),
            "eight" : list(),
            "seven" : list(),
            "six"   : list(),
            "five"  : list(),
            "four"  : list()
            }


def sort_words():
    # Sort text file into the words length
    with open(WORDS) as words:
        for line in words:
            line = line.lower().strip()
            if len(line) == 9:
                word_dic["nine"].append(line)
            if len(line) == 8:
                word_dic["eight"].append(line)
            if len(line) == 7:
                word_dic["seven"].append(line)
            if len(line) == 6:
                word_dic["six"].append(line)
            if len(line) == 5:
                word_dic["five"].append(line)
            if len(line) == 4:
                word_dic["four"].append(line)


def find_target():
    # Pick random 9 letter word
    n = random.randint(0, len(word_dic["nine"]))
    target_anagrams["root_word"].append(word_dic["nine"][n])

    # Pick random letter in word
    n = random.randint(0, MAX_LETTERS-1)
    picked_letter = target_anagrams["root_word"][0][n]

    # Do not allow letter to be a vow
    while picked_letter in VOWS:
        n = random.randint(0, MAX_LETTERS-1)
        picked_letter = target_anagrams["root_word"][0][n]

    target_anagrams["root_letter"].append(picked_letter)


# Build the target anagram disctionary
# runs at O(N^3)
def find_anagrams():
    root_letter = target_anagrams["root_letter"][0]
    root_word = target_anagrams["root_word"][0]

    root_char_map = create_char_map(root_word)
    for x in KEYS:
        current_word_list = word_dic[KEYS[x]]
        for s in current_word_list:
            if root_letter in s:
                s_map = create_char_map(s)
                if( is_anagram(root_char_map, s_map, len(s)) ):
                    target_anagrams[KEYS[x]].append(s)

 # create a character map for words       
def create_char_map(word):
    char_map = {}

    for char in word:
        if char not in char_map.keys():
            char_map[char] = 1
        else:
            char_map[char] += 1

    return char_map


def is_anagram(root, bone, word_length):
    # if counts hits 0 word can be made with root
    count = word_length

    for key in list(root.keys()):
        if key in bone.keys() and (root[key] - bone[key]) >= 0:
            count -= 1

    return count == 0

# writes dictrionary to json file
def write_json():
    filename = target_anagrams["root_word"][0]

    with open(f'./anagram_db/{filename}.txt', 'w') as json_file:
        json.dump(target_anagrams, json_file)


def main():

    sort_words()
    find_target()
    find_anagrams()
    # write_json()

    return target_anagrams

