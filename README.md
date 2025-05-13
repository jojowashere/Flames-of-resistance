# Flames of Resistance: A Fahrenheit 451-inspired Board Game

This is a digital board game inspired by Ray Bradbury's novel "Fahrenheit 451." Players take on the role of characters from the book, attempting to preserve knowledge by collecting books while avoiding censorship.

## Game Features

- Interactive board game with branching paths 
- Character selection with unique abilities from Fahrenheit 451
- Trivia questions based on the novel
- Shop system using knowledge points to buy items from the book
- Multiple win conditions: individual victory (10 books) or team victory (30 knowledge points)

## How to Play

1. Open `index.html` in a web browser
2. Select the number of players (2-4)
3. Each player selects a character
4. Take turns rolling the dice and moving around the board
5. Choose your path when multiple options are available
6. Collect books, answer trivia, visit shops, and avoid dangers
7. The first player to collect 10 books wins, or the team wins by collecting 30 knowledge points

## Running the Game Server

To run the game with the Node.js server (allows multiple players to access it on your network):

1. Make sure you have Node.js installed
2. Open a terminal/command prompt in this directory
3. Run: `node server.js`
4. Open a web browser and go to: `http://localhost:5000`

## Files and Structure

- `index.html` - Main game page
- `css/styles.css` - All game styling
- `js/` - JavaScript files:
  - `board.js` - Board space definitions
  - `characters.js` - Character definitions
  - `game.js` - Main game logic
  - `shop.js` - Shop system
  - `trivia.js` - Trivia questions and events
- `pages/` - Additional HTML pages:
  - `rules.html` - Game rules
  - `reflection.html` - Reflection on the game's connection to the novel
- `server.js` - Simple Node.js server for hosting the game

## Thematic Elements

The game incorporates key themes from Fahrenheit 451:
- The importance of preserving knowledge and books
- The danger of censorship
- Characters representing different perspectives from the novel
- Items from the book with special abilities

Enjoy playing Flames of Resistance!
