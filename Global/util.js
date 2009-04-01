function range(base, step) {
    var ret = [];
    if (!step) {
	step = 1;
    };

    for (var i = 0; i < base; i+=step) {
	ret.push(i);
    };
    return ret;
};