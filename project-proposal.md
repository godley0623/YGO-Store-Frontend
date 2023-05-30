# Project Proposal

## Project Choice
Yu-Gi-Oh Card Store

## Project Description 
A fake online card store that uses a Yugioh api to get the cards used to make the store.

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

#### MVP Goals
-Allow the users to search cards  
-Allow the user to add cards to their cart  
-Create an animation that enlarges the card when you hover over it  

#### Stretch Goals
-Create an Auth system to allow users to sign up and login