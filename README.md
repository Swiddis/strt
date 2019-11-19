# strt
A simple startpage, available at https://swiddiszwei.github.io/strt/

The listed sites can be navigated by clicking on the menu letters and expanding them, but it's designed to be keyboard-controlled.

The input form is in the top left, and the commands are as follows.

? - Pops up a help dialogue.

[category] - Expands/collapses the category with that name. Does nothing of the category doesn't exist. Example on the default site list is 'm'.

[category][tag] - Goes to the tag under the given category. An example on the default is 'mt' to go to twitter.

/[search] - Runs the search on ecosia.org. Enabling more search engines may be implemented later.

=[search] - Runs the search on wolframalpha.com.

,[site] - Go to the given site.

+[category] [tag] [name] [url] - Adds the given site. Category is the menu it will fall under (will automatically make a new category if one does not exist, you can also just do +[category]), tag is what will help navigate to the site under the category, the name will go next to the tag in the dropdown (not recommended more than 14 characters), and the url is the url to the site. An example is +m y youtube youtube.com

-[category][tag] - Remove the given tag from the given category. Can also remove a whole category with -[category].

$ - Show extra info, such as the time and system information. platform.js was taken from the source code for weboas.is, I couldn't find a license so as long as nobody complains I'll keep it here.

\* - Reset site list to default.

Made with love.

Tested on Firefox, Chrome, and Edge, on Windows 10. 
