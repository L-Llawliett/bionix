walk(document.body);

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch (node.nodeType) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;
	console.log(v);


	var y = v.split(" "); //string split by space -> converted to list

	$(textNode).html(function() { //.html() changes the pages html code so that we can add <b> </b> bold tags into words
	for (var i in y) {// #iterates through every value/element in list
		console.log(y[i])
		if ((y[i]).length == 1) { //#base-case EX/ a, i, e... 1 letter words
			var printStr = "<b>" + y[i] + "</b>"; // makes the word bold
			console.log(printStr);
			v = v.replace(y[i], printStr); //replaces the word with the bold version
			//console.log(x);
		}
		else if ((y[i]).length / 2 % 1 == 0) { //#if its an even number
			var fullStr = y[i]; //#gets a name so its recognizable 
			var cutlen = (fullStr).length / 2; //# takes the word "Apples" length (6), halves it, cuts off decimals so it's 3
			var backStr = fullStr.slice(cutlen, fullStr.length); //takes the back half of the word --> "les" 
			var frontStr = fullStr.slice(0, cutlen); // takes the front half of the word --> "app"
			var printStr = "<b>" + frontStr + "</b>" + backStr; // "<b>app</b>les"
			console.log(printStr);
			v = v.replace(y[i], printStr); //replaces the word with the new version of the word
			//console.log(printStr);
		}
		else if ((y[i]).length / 2 % 1 != 0) {//if it's an odd number
			var fullStr = y[i]; 
			var cutlen = ((fullStr).length - 1) / 2; // #Makes length even, rounding down
			var backStr = fullStr.slice(cutlen, fullStr.length); //takes the back half of the word
			var frontStr = fullStr.slice(0, cutlen); //takes the front half of the word
			var printStr = "<b>" + frontStr + "</b>" + backStr; //combines them to make the full word with a bolded first half
			console.log(printStr);
			v = v.replace(y[i], printStr); //replaces the word with the new version of the word
			//console.log(printStr);

		}
	}
		return (v); //substitute the text in the page with this new text, which is the same but bolded.
	})
	console.log(textNode);
	console.log(textNode.innerHTML);
	console.log(v);
}
