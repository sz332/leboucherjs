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

    return {
        cycles: function(nodes, edges) {

            var result = [];

            nodes.forEach(function(node) {
                cycleRecursive(node, nodes, edges, [], result);
            });

            return unique(result).map(function(list) { list.shift(); return list; }).sort(function(a, b) { return a.length - b.length; });
        },

        orderedCycles: function(nodes, edges) {
            var result = GraphLibrary.cycles(nodes, edges);

            var lastSize = 0;
            var sameSizeList = [];

            var list = [];

            for (var i = 0; i < result.length; i++) {

                var path = result[i];

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

            list.push({
                length: lastSize,
                data: sameSizeList
            });

            return list;
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
         * 
         * Iterate over the remaining paths from longer to shorter
         *   if a longer path contains a shorter, remove the shorter from the list
         * 
         *  Finally return the list of paths, and information about reduction:
         * 
         *  originalSize: the original number of cycles
         *  minimizedSize: the size after minimizin the list by the algorithm
         *  deduplicatedSize: if a longer list contains a shorter list, remove the shorter list
         *  edges: remaining edges
         * 
         */
        minialCoveringCycles: function(list, edges) {
            var paths = [];

            var info = {
                originalSize : 0
            }

            for (var i = 0; i < list.length; i++){
                info.originalSize += list[i].data.length;
            }

            var _edges = clone(edges);

            list.every(function(entries) {

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

            // order the paths in backwards
            paths = paths.sort(function(a, b) { return b.length - a.length; });

            // remove unnecessary ones
            for (var i = 0; i < paths.length; i++) {
                for (var j = paths.length - 1; j > i; j--) {

                    if (includeArray(paths[i], paths[j])) {
                        paths.splice(j, 1);
                    }
                }
            }

            info.deduplicatedSize = paths.length;
            info.edges = _edges;

            // reorder them back
            paths = paths.sort(function(a, b) { return a.length - b.length; });

            // return the paths, and the remaining edges, if any
            return {
                paths: paths,
                info: info
            };
        }
    };

}());

// paths = [
//     [1, 2, 3, 4, 5],
//     [2, 3, 4],
//     [1, 2]
// ];

// for (var i = 0; i < paths.length; i++) {
//     for (var j = paths.length - 1; j > i; j--) {

//         if (includeArray(paths[i], paths[j])) {
//             paths.splice(j, 1);
//         }
//     }
// }

// console.log(paths);

// var nodes = [];

// nodes.push({ id: 1, name: "1" });
// nodes.push({ id: 2, name: "2" });
// nodes.push({ id: 3, name: "3" });
// nodes.push({ id: 4, name: "4" });
// nodes.push({ id: 5, name: "5" });
// nodes.push({ id: 6, name: "6" });
// nodes.push({ id: 7, name: "7" });

// var edges = [];

// edges.push({ from: 1, to: 2 });
// edges.push({ from: 2, to: 3 });
// edges.push({ from: 2, to: 5 });
// edges.push({ from: 3, to: 1 });
// edges.push({ from: 5, to: 6 });
// edges.push({ from: 5, to: 7 });
// edges.push({ from: 6, to: 3 });

// var list = GraphLibrary.orderedCycles(nodes, edges);

// var result2 = GraphLibrary.minialCoveringCycles(list, edges);

// console.log(result2);

//var data = myModule.graphData();

//var result = GraphLibrary.cycles(data.nodes, data.edges);

//console.log(result);