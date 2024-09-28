// Select the .scroll-content div
const scrollContent = document.querySelector('.scroll-content');

// Generate some dynamic text content
const dynamicText = `
  Details
I will embed links to possible HTML/CSS/JavaScript resources here.  You can use the Java or Android Studio options in the Development Platform Rules document if you want, but only example resources for the HTML/CSS/Javascript platform will be provided by us.  For this sub-phase, you will create something that looks like an app running on a mobile device of the specified size (HTML starter file example) with six tabs. The "tabs" might be implemented via styled buttons and placement in HTML but there are other approaches in HTML. They might be implemented by making use of something like TabLayout in Android Studio, but again there are multiple approaches. They might be implemented using something such as a JTabbedPane. Making choices such as these is one of the challenges of this assignment. Again, feel free to consult with members of your team and to utilize general websites that give examples as you proceed. You have control over the colors and specific visual style aspects. The contents of each tab are described here:
Tab 1: The tab itself will be titled "Text" and the contents need to be a long page of text where the user will need to scroll down to be able to see all of it. An example of how Tab 1 might appear. Notice how the text has a scrollbar but not the navigation bar with the tabs.
Tab 2: The tab itself will be titled "Choices" and the contents need to include (1) something with a radio button entry option, (2) something with a drop-down list entry option, (3) a traditional button that when pressed will display text that is somehow reflecting the options chosen. There are various ways to accomplish this, such as in HTML.  An example of how Tab 2 might appear.
Tab 3: The tab itself will be titled "ToDo" and the contents need to be a functional, basic, "To Do" list where the user can type in a new item and add it to the list, and the user can then either delete things from the list or be able to "cross off" things on the list in some meaningful manner. There are various ways to accomplish this, such as in HTML.  An example of how Tab 3 might appear.
Tab 4: The tab itself will be titled "Profile" and the contents need to be a centered image with a centered bold name under the image, such that when the user taps the image a notification appears. The user should then be able to close the notification.  This HTML example might have useful ideas.  An example of how Tab 4 might appear at first and an example of how Tab 4 might appear after tapping the image.
`;

// Inject the generated content into the scroll-content div
scrollContent.innerHTML = dynamicText;
