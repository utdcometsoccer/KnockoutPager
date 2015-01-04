function isObservableArray(obj) {
    return ko.isObservable(obj) && obj().constructor === Array;
}

ko.observableArray.fn.paginate = function () {
    var self = this;
    if (!self.pageSize) {
        self.pageSize = ko.observable(5);
    }
    if (!self.start) {
        self.start = ko.observable(0);
    }
    if (!self.pages) {
        self.pages = ko.observableArray();
    }
    else {
        self.pages.removeAll();
    }
    if (!self.isPaged) {
        self.isPaged = ko.observable(false);
    }
    if (!self.currentIndex) {
        self.currentIndex = ko.observable(0);
    }
    if (!self.currentPage) {
        self.currentPage = ko.observable();
    }

    if (!self.pagedData) {
        self.pagedData = ko.computed(function () {
            var currentPage = self.currentPage();
            if (currentPage) {
                currentPage.selected(true);
                return self.slice(currentPage.start, currentPage.end);
            }
        }, self);
    }
    var pageSize = self.pageSize();
    var length = self().length;
    var pageCount = Math.max(length / pageSize, 1);
    for (var pageStart = 0; pageStart < pageCount; pageStart++) {
        var pageNumber = pageStart + 1;
        var pageEnd = pageNumber * pageSize;
        pageEnd = pageEnd <= length ? pageEnd : length;
        self.pages.push({
            page: pageNumber,
            start: pageStart * pageSize,
            end: pageEnd,
            selected: ko.observable(false)
        });
    }
    if (self.pages().length >= 1) {
        self.currentPage(self.pages()[0]);
    }
    self.isPaged(true);
};
ko.observableArray.fn.configurePaging = function () {
    var self = this;
    self.paginate();
    self.subscribe(function () {
        self.paginate();
    });
};
ko.observableArray.fn.ensurePaging = function () {
    var self = this;
    if (!self.isPaged || !self.isPaged()) {
        self.configurePaging();

    }
};
ko.observableArray.fn.currentIndex = ko.observable(0);

ko.observableArray.fn.Next = function () {
    var self = this;
    if (isObservableArray(self)) {
        self.ensurePaging();
        var length = self.pages().length;
        if (length) {
            if (self.currentPage().page < length) {
                self.currentPage().selected(false);
                self.currentPage(self.pages()[self.currentPage().page]);
                }
        }

        else {
            self.currentIndex(0);
        }
    }
};

ko.observableArray.fn.Previous = function () {
    var self = this;
    if (isObservableArray(self)) {
        self.ensurePaging();
        if (self.currentPage().page - 2 >= 0) {
            self.currentPage().selected(false);
            self.currentPage(self.pages()[self.currentPage().page - 2]);
            self.currentPage().selected(true);
        }
    }
};

ko.observableArray.fn.setPage = function (page) {
    var self = this;
    if (isObservableArray(self)) {
        self.ensurePaging();
        self.currentPage(page >= 0 && page < self.pages().length ? self.pages()[page] : self.currentPage());
    }
};

ko.paginateAll = function (target, ignoreList) {
    if (ignoreList && ignoreList.constructor === Array) {
        for (var property in target) {
            if (-1 === ignoreList.indexof(property)) {
                var obj = target[property];
                if (ko.isObservable(obj) && obj().constructor === Array) {
                    obj.ensurePaging();
                }
            }
        }
    }

    else {
        for (var property in target) {
            var obj = target[property];
            if (ko.isObservable(obj) && obj() && obj().constructor === Array) {
                obj.ensurePaging();
            }
        }
    }

};