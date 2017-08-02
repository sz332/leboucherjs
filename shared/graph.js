//const myModule = require('./data');

var GraphLibrary = (function() {

    var getOutNodes = function(node, nodes, edges) {

        var list = [];

        edges.forEach(function(edge) {

            if (edge.from === node.id) {
                list.push(nodes.find(function(item) {
                    return item.id === edge.to;
                }));
            }

        });

        return list;
    };

    var clone = function(input) {
        return JSON.parse(JSON.stringify(input));
    };

    var removeDuplicates = function(input) {
        return input.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });
    };

    var cycleRecursive = function(current, nodes, edges, path, result) {

        if (path.length > 0) {

            // we found a current, self-returning circle
            if (path[0] === current.id) {
                path.push(current.id);
                result.push(path);
                return;
            }

            // we already found a path and a circle, this is not what we want
            if (path.find(function(f) { return f === current.id; })) {
                return;
            }
        }

        var outNodes = getOutNodes(current, nodes, edges);

        outNodes.forEach(function(node) {
            var clonedArray = clone(path);
            clonedArray.push(current.id);
            cycleRecursive(node, nodes, edges, clonedArray, result);
        }.bind(this));

    };

    var arrayEquals = function(a, b) {

        if (a.length === b.length) {

            var sortedA = removeDuplicates(clone(a)).sort();
            var sortedB = removeDuplicates(clone(b)).sort();

            for (var i = 0; i < sortedA.length; i++) {
                if (sortedA[i] !== sortedB[i]) {
                    return false;
                }
            }

            return true;
        }

        return false;
    };

    var includeArray = function(source, target) {

        for (var i = 0; i < source.length; i++) {

            var found = true;

            for (var j = 0; j < target.length; j++) {
                if (source[i + j] != target[j]) {
                    found = false;
                }
            }

            if (found) {
                return true;
            }
        }

        return false;
    };

    var unique = function(list) {

        var result = [];

        list.forEach(function(item) {

            var found = false;

            result.forEach(function(r) {

                if (arrayEquals(r, item)) {
                    found = true;
                }

            });

            if (!found) {
                result.push(item);
            }

        });

        return result;
    };

    var groupPaths = function(pathList) {

        var lastSize = 0;
        var sameSizeList = [];

        var list = [];

        for (var i = 0; i < pathList.length; i++) {

            var path = pathList[i];

            if (lastSize == 0) {
                lastSize = path.length;
            }

            if (path.length == lastSize) {
                sameSizeList.push(path);
            } else {
                list.push({
                    length: lastSize,
                    data: sameSizeList
                });

                sameSizeList = [];
                sameSizeList.push(path);
                lastSize = path.length;
            }
        }

        if (lastSize !== 0) {
            list.push({
                length: lastSize,
                data: sameSizeList
            });
        }

        return list;
    };


    return {
        cycles: function(nodes, edges) {

            var result = [];

            nodes.forEach(function(node) {
                cycleRecursive(node, nodes, edges, [], result);
            });

            return unique(result).map(function(list) { list.shift(); return list; }).sort(function(a, b) { return a.length - b.length; });
        },

        orderedCycles: function(nodes, edges) {
            var pathList = GraphLibrary.cycles(nodes, edges);
            return groupPaths(pathList);
        },

        /**
         * Returns the minial list cycles which cover the graph
         * 
         * The algorithm does the following:
         * 
         * it goes through the list of cycles found by orderedCycle method from the 
         * paths containing the smallest amount of nodes, to the largest one
         * 
         * for each path
         *  for each segment of the path
         *      if the segment is part of the graph's edges, then remove the edge
         *
         *  if at least a single edge was removed, the path is good, add it to our list

         *  Finally return the list of paths, and information about reduction:
         * 
         *  originalSize: the original number of cycles
         *  minimizedSize: the size after minimizin the list by the algorithm
         *  edges: remaining edges
         * 
         */
        minialCoveringCycles: function(list, edges) {
            var paths = [];

            var info = {
                originalSize: 0
            }

            for (var i = 0; i < list.length; i++) {
                info.originalSize += list[i].data.length;
            }

            var _list = clone(list);
            var _edges = clone(edges);

            _list.every(function(entries) {

                entries.data.every(function(path) {

                    // make a clone from the old path
                    var oldPath = clone(path);

                    // add the first element to the end of the list so that the path will be a cycle
                    path.push(path[0]);

                    // found at least an edge to be removed
                    var removedEdge = false;

                    // for every edge in the path
                    for (var i = 0; i < path.length - 1; i++) {

                        var source = path[i];
                        var target = path[i + 1];

                        var oldSize = _edges.length;

                        // create a new array from the old one, removing the edge if found
                        _edges = _edges.filter(function(edge) { return edge.from !== source || edge.to !== target });

                        // if the size of the edges array changed, then this path actually removed an edge, so it is an usable one
                        if (_edges.length !== oldSize) {
                            removedEdge = true;
                        }
                    }

                    // if the path removed at least a single edge, add it to the list
                    if (removedEdge) {
                        paths.push(oldPath);
                    }

                    return (_edges.length !== 0);

                }.bind(this));

                return (_edges.length !== 0);
            }.bind(this));

            // minimalize the number of paths

            info.minimizedSize = paths.length;

            // return the paths, and the remaining edges, if any
            return {
                paths: groupPaths(paths),
                info: info
            };
        }
    };

}());