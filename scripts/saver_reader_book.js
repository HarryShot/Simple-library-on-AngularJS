var saver_reader_book;
saver_reader_book = (function () {

    var _data = [];

    //add book to local variable DATA
    function _addBook(author, title, genre, numbOfPage) {
        _data.push({
            id: getCurrentId(),
            title: title,
            genre: genre,
            numOfPage: numbOfPage,
            author: author
        });
    }

    //remove book from DATA by id
    function _removeBook(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        })
    }

    //update information about book
    function _updateBook(id, value) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data[index] = value;
            }
        })
    }

    //save book info to localStorage
    function _saveBook() {
        window.localStorage["book"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    //read all about book from storage
    function _readBook() {
        var temp = window.localStorage["book"]

        if (!temp) _data = [];
        else _data = JSON.parse(temp);

        return _data;
    }

    //generate ID for book before saving
    function getCurrentId() {
        if (!_data || _data.length == 0) return 0;
        else return (_data[_data.length - 1].id) + 1;
    }

    return {
        data: _data,
        addBook: _addBook,
        updateBook: _updateBook,
        removeBook: _removeBook,
        saveBook: _saveBook,
        readBook: _readBook
    };

})();