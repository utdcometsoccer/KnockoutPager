function knockoutPager(ko, observableArray, pageSize, start) {
    var self = this, currentIndex = ko.observable(0);
    self.pageSize = ko.observable(pageSize && typeof pageSize === 'number' ? pageSize : 5);
    self.start = ko.observable(start && typeof start === 'number' ? start : 0);
    self.pages = ko.observableArray();
    self.paginate = function (data) {
        self.pages.removeAll();
        var pageCount = data.length / self.pageSize();
        for (var pageStart = 0; pageStart < pageCount; pageStart++) {
            var pageNumber = pageStart + 1;
            var pageEnd = pageNumber * pageSize;
            pageEnd = pageEnd <= data.length ? pageEnd : data.length;
            self.pages.push({
                page: pageNumber,
                start: pageStart * pageSize,
                end: pageEnd
            });
        }
    };

    self.paginate(observableArray());

    self.currentPage = ko.computed(function () {
        return self.pages()[currentIndex()];
    }, self);

    self.pagedData = ko.computed(function () {
        var currentPage = self.currentPage();
        if (currentPage) {
            return observableArray.slice(currentPage.start, currentPage.end);
        }
    }, self);

    self.Next = function () {
        if (self.pages().length) {
            currentIndex(currentIndex() < self.pages().length - 1 ? currentIndex() + 1 : self.pages().length - 1);
        }

        else {
            currentIndex(0);
        }
    };

    self.Back = function () {
        currentIndex(currentIndex() > 0 ? currentIndex() - 1 : 0);
    };

    self.setPage = function (page) {
        currentIndex(page > 0 && page < self.pages.length ? page : currentIndex());
    };



    observableArray.subscribe(function (array) {
        self.paginate(array);
    });

};