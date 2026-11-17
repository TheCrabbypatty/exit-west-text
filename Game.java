// Game.java
// Friend owns this file. Pat owns index.html.
// Rule for this file: respond() takes text in and returns text out.
// No Scanner and no System.out inside respond(). That keeps it
// easy to copy into JavaScript, line for line.
//
// Test in console:
//   javac Game.java
//   java Game
// Then type commands like: look, help, gather food, open door, talk

import java.util.Scanner;

public class Game {
    private String scene = "city";
    private int food = 0;
    private int water = 0;
    private boolean hasBlanket = false;
    private int hope = 3;

    public String getIntro() {
        return "Doors: a text game about Exit West.\n"
            + "You are Saeed, in the city, with Nadia.\n"
            + "Type 'help' to see commands. Type 'look' to see where you are.";
    }

    public String respond(String rawInput) {
        if (rawInput == null) {
            return "Try typing a command, or type 'help'.";
        }
        String input = rawInput.toLowerCase().trim();

        if (input.equals("help")) {
            return "Commands: look, help, inventory, gather food, gather water, "
                + "talk, open door, take blanket, go, wait";
        }
        if (input.equals("look")) {
            return describeScene();
        }
        if (input.equals("inventory")) {
            return "Food: " + food + ". Water: " + water
                + ". Blanket: " + (hasBlanket ? "yes" : "no")
                + ". Hope: " + hope + ". Scene: " + scene + ".";
        }

        if (scene.equals("city")) {
            return city(input);
        }
        if (scene.equals("fall")) {
            return fall(input);
        }
        if (scene.equals("mykonos")) {
            return mykonos(input);
        }
        if (scene.equals("london")) {
            return london(input);
        }
        if (scene.equals("marin")) {
            return marin(input);
        }
        return "You are somewhere unknown. Type 'look'.";
    }

    private String describeScene() {
        if (scene.equals("city")) {
            return "Evening class in the city. Nadia sits nearby. "
                + "Outside, the streets are tense and the power is unreliable. "
                + "Try: talk, gather food, open door";
        }
        if (scene.equals("fall")) {
            return "Night. The power is out and a curfew is in place. "
                + "You need food and water before you can cross. "
                + "Try: gather food, gather water, open door";
        }
        if (scene.equals("mykonos")) {
            return "A camp on Mykonos. Tents, queues, and the sea nearby. "
                + "You arrive with nothing. A worker offers help. "
                + "Try: talk, take blanket, open door";
        }
        if (scene.equals("london")) {
            return "A shared house in London. Rooms, housemates, and a flyer on the wall. "
                + "Try: talk, take blanket, go, open door";
        }
        if (scene.equals("marin")) {
            return "Marin, California. Quiet streets and a different life. "
                + "Nadia says you are going different ways now. "
                + "Try: talk, go, wait";
        }
        return "Unknown place.";
    }

    private String city(String input) {
        if (input.equals("talk")) {
            return "Nadia talks about leaving, and about what home means now. "
                + "She is steady. You feel less alone.";
        }
        if (input.equals("gather food")) {
            food = food + 1;
            scene = "fall";
            return "You gather food. Night falls, the power goes out, and a curfew starts. "
                + "You are now in the fall. Type 'look'.";
        }
        if (input.equals("open door")) {
            return "Not yet. Gather food first, so you have something to carry.";
        }
        return "That does not work here. Type 'look' or 'help'.";
    }

    private String fall(String input) {
        if (input.equals("gather food")) {
            food = food + 1;
            return "You find food. Food: " + food + ".";
        }
        if (input.equals("gather water")) {
            water = water + 1;
            return "You find water. Water: " + water + ".";
        }
        if (input.equals("open door")) {
            if (food >= 1 && water >= 1) {
                food = 0;
                water = 0;
                scene = "mykonos";
                return "You cross through the door. You arrive in Mykonos with nothing, "
                    + "as the crossing takes what you carried. Type 'look'.";
            }
            return "You need at least 1 food and 1 water before you cross.";
        }
        return "That does not work here. Type 'look' or 'help'.";
    }

    private String mykonos(String input) {
        if (input.equals("talk")) {
            return "A camp worker explains the queues and where to sleep. "
                + "It is crowded, but people help each other.";
        }
        if (input.equals("take blanket")) {
            hasBlanket = true;
            return "You take a blanket. It will matter later.";
        }
        if (input.equals("open door")) {
            scene = "london";
            return "You step through another door, to London. Type 'look'.";
        }
        return "That does not work here. Type 'look' or 'help'.";
    }

    private String london(String input) {
        if (input.equals("talk")) {
            return "A housemate talks about the house rules and the march outside. "
                + "Belonging here feels uncertain.";
        }
        if (input.equals("take blanket")) {
            if (hasBlanket) {
                return "You already have the blanket. You can share it or keep it.";
            }
            hasBlanket = true;
            return "You find a blanket in the house.";
        }
        if (input.equals("go")) {
            scene = "marin";
            return "You leave London and travel on, to Marin. Type 'look'.";
        }
        if (input.equals("open door")) {
            return "The door here leads back to the house, not forward. Try 'go'.";
        }
        return "That does not work here. Type 'look' or 'help'.";
    }

    private String marin(String input) {
        if (input.equals("talk")) {
            hope = hope + 1;
            return "Nadia says you are going different ways now. "
                + "It hurts, and it is honest. Hope: " + hope + ".";
        }
        if (input.equals("go")) {
            return "You walk on. Arrival was instant, through the doors, "
                + "but belonging takes time. This is the end of this short game. "
                + "Thank you for playing.";
        }
        if (input.equals("wait")) {
            return "You wait and watch the street. Nothing changes quickly here.";
        }
        return "That does not work here. Type 'look' or 'help'.";
    }

    public static void main(String[] args) {
        Game game = new Game();
        System.out.println(game.getIntro());
        System.out.println(game.describeScene());
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String input = sc.nextLine();
            System.out.println(game.respond(input));
        }
        sc.close();
    }
}
