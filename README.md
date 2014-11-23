KnockoutPager
=============
By No means a finished product! 
JavaScript class that pages data from an observable array
Create one like so:
var pager = new knockoutPager(ko, swapkidsstuff.viewModel.sizes, 5, 0) ;
The object has the following properties:
	• pageSize : observable that represents the number of items in a page
	• start : index of the item in the array to start with
	• pages: observable array of page objects 
	• currentPage: computed observable that represents the current page
	• pagedData: computed observable that actually has the paged data from the original array.
And the following methods:
	• Next: advance currentPage property to the next page
	• Back: move currentPage property back one

SetPage: set the page number directly.


