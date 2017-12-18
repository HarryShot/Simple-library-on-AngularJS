var saver_reader_author = (function () {

    var _data = [];

        /// add author to local variable DATA
    function _addAuthor(name, secname, lastname, bdate) {
        _data.push({
            id: getCurrentId(),
            name: name,
            secname: secname,
            lastname: lastname,
            bdate: bdate
        });
    }

    //removing author from DATA by id
    function _removeAuthor(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        })
    }

    //updating author data
    function _updateAuthor(id, value) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data[index] = value;
            }
        })
    }

    //save data to localStorage
    function _saveAuthor() {
        window.localStorage["autor"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    //read data from localStorage
    function _readAuthor() {
        var temp = window.localStorage["autor"]

        if (!temp) _data = [];
        else _data = JSON.parse(temp);

        return _data;
    }

    //generate ID for author in storage
    function getCurrentId() {
        if (!_data || _data.length == 0) return 0;
        else return (_data[_data.length - 1].id)+1;
    }

    return {
        data: _data,
        addAuthor: _addAuthor,
        updateAuthor: _updateAuthor,
        removeAuthor: _removeAuthor,
        saveAuthor: _saveAuthor,
        readAuthor: _readAuthor
    };

})();