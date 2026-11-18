// Game.java
// Put code hre
// Nothing much in the file yet. Fill in the game logic here.
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner bucky = new Scanner(System.in);
	//In Saeed's perspective//
	System.out.println("In this choose your own adventure, you take the place of Saeed and will choose his choices at various times throughout the book, by entering 1 or 2.");
        System.out.println("After hearing that your father has chosen to stay in the city as to not leave the place he has lived his entire life with your mother. You have the choice to either continue on your plan to leave the city and go through the door with Nadia or to stay with your father. What do you do? (1 or 2)");
       int choice  =bucky.nextInt();
	if (choice == 1)
	{
System.out.println("You choose to continue on with your plan to go through the door with Nadia. When you go through the door, you arrive in Mykonos and begin living in the refugee camp there. Eventually, you take another door to London, and begin living in an abondoned large mansion with dozens of other refugees from around the world.");
        }
else
{
 System.out.println("You choose to abandon your plan with Nadia and stay with your father. Nadia is angry with you, but has to leave quickly in order to meet up with the agent. You spend the next few months with your father, always in fear of the militants deciding to kill you, or of the fighting starting up again. After a few months, your father contracts pneumonia and dies, leaving you alone. You begin having doubts about not going with Nadia when you had the chance, and imagine how life would be if you had chosen to go.");
}
 }
}





import java.util.Scanner;

public class Game {
  public String getIntro() {
    return "In this choose your own adventure, you take the place of Saeed and will choose his choices at various times throughout the book, by entering 1 or 2.\n"
      + "After hearing that your father has chosen to stay in the city as to not leave the place he has lived his entire life with your mother. You have the choice to either continue on your plan to leave the city and go through the door with Nadia or to stay with your father. What do you do? (1 or 2)";
  }

  public String respond(String input) {
    int choice;
    try {
      choice = Integer.parseInt(input.trim());
    } catch (Exception e) {
      return "Please enter 1 or 2.";
    }
    if (choice == 1) {
      return "You choose to continue on with your plan to go through the door with Nadia. When you go through the door, you arrive in Mykonos and begin living in the refugee camp there. Eventually, you take another door to London, and begin living in an abandoned large mansion with dozens of other refugees from around the world.";
    } else {
      return "You choose to abandon your plan with Nadia and stay with your father. Nadia is angry with you, but has to leave quickly in order to meet up with the agent. You spend the next few months with your father, always in fear of the militants deciding to kill you, or of the fighting starting up again. After a few months, your father contracts pneumonia and dies, leaving you alone. You begin having doubts about not going with Nadia when you had the chance, and imagine how life would be if you had chosen to go.";
    }
  }

  public static void main(String[] args) {
    Game game = new Game();
    System.out.println(game.getIntro());
    Scanner bucky = new Scanner(System.in);
    if (bucky.hasNextLine()) {
      System.out.println(game.respond(bucky.nextLine()));
    }
    bucky.close();
  }
}



