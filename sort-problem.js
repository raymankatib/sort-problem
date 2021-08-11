const sortCategoriesForInsert = (inputJson) => {
	let stackList = [];
	let finalList = [];
	let originalList = inputJson;

	function initNode() {
		stackList = originalList.filter((category) => category.parent_id === null);
		finalList = [...stackList];
		originalList = originalList.filter((category) => category.parent_id);
	}

	function sort() {
		initNode();

		let stackHasItems = stackList.length > 0;
		let originalListHasItems = originalList.length > 0;

		//we will loop over the stack until the stack is empty and the original list is also empty
		while (stackHasItems || originalListHasItems) {
			if (stackHasItems) {
				const workingNode = stackList.shift(); //pop out the first item from the stackList
				const workingNodeChildren = originalList.filter((category) => category.parent_id === workingNode.id);
				stackList = [...stackList, ...workingNodeChildren];
				finalList = [...finalList, ...workingNodeChildren];
				originalList = originalList.filter((category) => category.parent_id !== workingNode.id);
			} else if (originalListHasItems) {
				const workingNode = originalList.shift();
				const workingNodeChildren = originalList.filter((category) => category.parent_id === workingNode.id);
				stackList = [...stackList, ...workingNodeChildren];
				finalList = [...finalList, workingNode, ...workingNodeChildren];
				originalList = originalList.filter((category) => category.parent_id !== workingNode.id);
			}

			stackHasItems = stackList.length > 0;
			originalListHasItems = originalList.length > 0;
		}

		return finalList;
	}

	return sort(originalList);
};
console.log(sortCategoriesForInsert(data));
