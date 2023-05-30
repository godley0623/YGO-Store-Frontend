# Project Proposal

## Project Choice
Yu-Gi-Oh Card Store

## Project Description 
A fake online card store that uses a Yugioh api to get the cards used to make the store.

## Models

# Card
id: Number - The Konami id that's given to every card  
name: String - The name of the card  
type: String - The type of the card  
desc: String - The description that's given to every card  
atk: Number - The attack value given to monster cards (If a card doesn't have an attack value -1 will be used instead)   
def: Number - The defense value given to monster cards (If a card doesn't have a defense value -1 will be used instead)  
level: Number - The level value of a monster card (If a card doesn't have a level -1 will be used instead)  
scale: Number - The scale value of a pendulum monster (If a card doesn't have a scale -1 will be used instead)   
linkval: Number - The link value of a link monster (If a card doesn't have a link -1 will be used instead)  
race: String - The card's race  
attribute: String - The attribute of a card (If a card doesn't have an attribute "N/A" will be used instead)  
archetype: String - The archetype that the card belongs to (If a card doesn't have an archetype "N/A" will be used instead)  
card_image: String - The url of the card's image  
card_price: Number - The price of the card

# Cart
item: String - The name of the item  
quantity: Number - The number of the item  
price: Number - The price of the item

## Routes
'/' GET: - Gets all cards.  
'/archetype/:archetype' GET: - Gets all cards from a given archetype.  
'/name/:name' GET: - Gets all cards based on their card name.  
'/similar/:similar' GET: - Get all cards that includes the query in their name. (/similar/Dark - will get all cards that include "Dark" in their name)

'/add' POST: - Adds a card to the database.

'/edit' PUT: - Edits a card in the database.

'/delete' DELETE: - Deletes a card in the database.

## Wire Frames

**Initial Landing View**

![image](screenshots/ygo-store-landing-page.png)

**Searching Cards**

![image](screenshots/ygo-store-search.png)

## User Stories
-As a user I should be able to query '/' route to get all cards  
-As a user I should be able to query '/archetype/:archetype' route to get all cards from a given archetype  
-As a user I should be able to query '/name/:name' route to get a card by name  
-As a user I should be able to query '/similar/:similar' route to get cards that have the query param in their name  
-As a user I should be able to query '/add' route to add a card to the database  
-As a user I should be able to query '/edit' route to edit a card in the database  
-As a user I should be able to query '/delete' route to delete a card from the database  
-Allow the users to search cards   
-Allow the user to add cards to their cart  
-Allow the user to see an animation that enlarges the card when you hover over it  
-Save the user's cart in the local storage  

#### MVP Goals
-Allow the users to search cards  
-Allow the user to add cards to their cart  
-Create an animation that enlarges the card when you hover over it  
-Save the user's cart in the local storage  

#### Stretch Goals
-Create an Auth system to allow users to sign up and login
-Create a decklist function for users to create a deck