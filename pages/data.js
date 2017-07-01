function graphData() {

    "use strict";

    var shape = "circularImage";

    var headParry = {
        id: "headParry",
        label: "Head parry",
        image: "images/headparry-small.png",
        shape: shape
    };

    var quarteParry = {
        id: "quarteParry",
        label: "Quarte parry",
        shape: shape,
        image: "images/quarteparry-small.png"
    };

    var tierceParry = {
        id: "tierceParry",
        label: "Tierce parry",
        shape: shape,
        image: "images/tierceparry-small.png"
    };

    var primeParry = {
        id: "primeParry",
        label: "Prime parry",
        shape: shape,
        image: "images/primeparry-small.png"
    };

    var kidneyParry = {
        id: "kidneyParry",
        label: "Kidney parry",
        shape: shape,
        image: "images/kidneyparry-small.png"
    };

    var flankParry = {
        id: "flankParry",
        label: "Flank parry",
        shape: shape,
        image: "images/flankparry-small.png"
    };

    var outsideLegParry = {
        id: "outsideLegParry",
        label: "Outside leg parry",
        shape: shape,
        image: "images/outsidelegparry-small.png"
    };

    var insideLegParry = {
        id: "insideLegParry",
        label: "Inside leg parry",
        shape: shape,
        image: "images/insidelegparry-small.png"
    };

    var risingParry = {
        id: "risingParry",
        label: "Rising parry",
        shape: shape,
        image: "images/risingparry-small.png"
    };

    var headBlow = {
        id: "headBlow",
        label: "Head blow",
        shape: shape,
        image: "images/headblow-small.png"
    };

    var insideFaceBlow = {
        id: "insideFaceBlow",
        label: "Inside face blow",
        shape: shape,
        image: "images/insidefaceblow-small.png"
    };

    var insideLegBlow = {
        id: "insideLegBlow",
        label: "Inside leg blow",
        shape: shape,
        image: "images/insidelegblow-small.png"
    };

    var kidneyBlow = {
        id: "kidneyBlow",
        label: "Kidney blow",
        shape: shape,
        image: "images/kidneyblow-small.png"
    };

    var risingBlow = {
        id: "risingBlow",
        label: "Rising blow",
        shape: shape,
        image: "images/risingblow-small.png"
    };

    var outsideLegBlow = {
        id: "outsideLegBlow",
        label: "Outside leg blow",
        shape: shape,
        image: "images/outsidelegblow-small.png"
    };

    var flankBlow = {
        id: "flankBlow",
        label: "Flank blow",
        shape: shape,
        image: "images/flankblow-small.png"
    };

    var faceThrust = {
        id: "faceThrust",
        label: "Thrust to face",
        shape: shape,
        image: "images/facethrust-small.png"
    };

    var outsideFaceBlow = {
        id: "outsideFaceBlow",
        label: "Outside face blow",
        shape: shape,
        image: "images/outsidefaceblow-small.png"
    };

    var nodes = [
        headParry, quarteParry, tierceParry, primeParry, kidneyParry, flankParry, outsideLegParry, insideLegParry, risingParry, headBlow, insideFaceBlow, insideLegBlow, kidneyBlow, risingBlow, outsideLegBlow, flankBlow, faceThrust, outsideFaceBlow
    ];

    var edges = [{
        from: "headBlow",
        to: "headParry"
    }, {
        from: "headParry",
        to: "headBlow"
    }, {
        from: "headParry",
        to: "insideFaceBlow"
    }, {
        from: "headParry",
        to: "insideLegBlow"
    }, {
        from: "insideFaceBlow",
        to: "quarteParry"
    }, {
        from: "quarteParry",
        to: "kidneyBlow"
    }, {
        from: "quarteParry",
        to: "risingBlow"
    }, {
        from: "quarteParry",
        to: "outsideLegBlow"
    }, {
        from: "quarteParry",
        to: "outsideFaceBlow"
    }, {
        from: "outsideFaceBlow",
        to: "tierceParry"
    }, {
        from: "tierceParry",
        to: "headBlow"
    }, {
        from: "tierceParry",
        to: "insideFaceBlow"
    }, {
        from: "tierceParry",
        to: "insideLegBlow"
    }, {
        from: "insideFaceBlow",
        to: "primeParry"
    }, {
        from: "primeParry",
        to: "headBlow"
    }, {
        from: "primeParry",
        to: "insideFaceBlow"
    }, {
        from: "primeParry",
        to: "insideLegBlow"
    }, {
        from: "kidneyBlow",
        to: "kidneyParry"
    }, {
        from: "kidneyParry",
        to: "headBlow"
    }, {
        from: "kidneyParry",
        to: "insideFaceBlow"
    }, {
        from: "kidneyParry",
        to: "kidneyBlow"
    }, {
        from: "kidneyParry",
        to: "insideLegBlow"
    }, {
        from: "kidneyParry",
        to: "flankBlow"
    }, {
        from: "flankBlow",
        to: "flankParry"
    }, {
        from: "flankParry",
        to: "headBlow"
    }, {
        from: "flankParry",
        to: "insideFaceBlow"
    }, {
        from: "flankParry",
        to: "flankBlow"
    }, {
        from: "flankParry",
        to: "outsideLegBlow"
    }, {
        from: "outsideLegBlow",
        to: "outsideLegParry"
    }, {
        from: "outsideLegParry",
        to: "headBlow"
    }, {
        from: "outsideLegParry",
        to: "insideFaceBlow"
    }, {
        from: "outsideLegParry",
        to: "flankBlow"
    }, {
        from: "insideLegBlow",
        to: "insideLegParry"
    }, {
        from: "insideLegParry",
        to: "outsideFaceBlow"
    }, {
        from: "risingBlow",
        to: "risingParry"
    }, {
        from: "risingParry",
        to: "faceThrust"
    }, {
        from: "faceThrust",
        to: "quarteParry"
    }, {
        from: "faceThrust",
        to: "tierceParry"
    }];


    var lessons = [];

    lessons.push([headParry, headBlow]);
    lessons.push([headParry, insideFaceBlow]);
    lessons.push([headParry, insideLegBlow]);
    lessons.push([insideFaceBlow, quarteParry]);
    lessons.push([insideFaceBlow, quarteParry, kidneyBlow]);
    lessons.push([insideFaceBlow, quarteParry, outsideFaceBlow]);
    lessons.push([insideFaceBlow, quarteParry, risingBlow]);
    lessons.push([insideFaceBlow, quarteParry, outsideLegBlow]);
    lessons.push([outsideFaceBlow, tierceParry]);
    lessons.push([outsideFaceBlow, tierceParry, headBlow]);
    lessons.push([outsideFaceBlow, tierceParry, insideFaceBlow]);
    lessons.push([outsideFaceBlow, tierceParry, insideLegBlow]);
    lessons.push([insideFaceBlow, primeParry]);
    lessons.push([insideFaceBlow, primeParry, headBlow]);
    lessons.push([insideFaceBlow, primeParry, insideLegBlow]);
    lessons.push([insideFaceBlow, primeParry, insideFaceBlow]);
    lessons.push([kidneyBlow, kidneyParry]);
    lessons.push([kidneyBlow, kidneyParry, headBlow]);
    lessons.push([kidneyBlow, kidneyParry, insideFaceBlow]);
    lessons.push([kidneyBlow, kidneyParry, flankBlow]);
    lessons.push([kidneyBlow, kidneyParry, insideLegBlow]);
    lessons.push([flankBlow, flankParry]);
    lessons.push([flankBlow, flankParry]);
    lessons.push([flankParry, flankBlow]);
    lessons.push([flankParry, headBlow]);
    lessons.push([flankParry, insideFaceBlow]);
    lessons.push([outsideLegBlow, outsideLegParry]);
    lessons.push([outsideLegBlow, outsideLegParry, headBlow]);
    lessons.push([outsideLegBlow, outsideLegParry, insideFaceBlow]);
    lessons.push([outsideLegBlow, outsideLegParry, flankBlow]);
    lessons.push([insideLegBlow, insideLegParry]);
    lessons.push([insideLegBlow, insideLegParry, outsideFaceBlow]);
    lessons.push([risingBlow, risingParry]);
    lessons.push([risingBlow, risingParry, faceThrust]);
    lessons.push([faceThrust, quarteParry]);
    lessons.push([faceThrust, quarteParry, outsideFaceBlow]);
    lessons.push([faceThrust, tierceParry]);
    lessons.push([faceThrust, tierceParry, insideFaceBlow]);
    lessons.push([faceThrust, tierceParry, insideLegBlow]);

    edges.forEach(function(edge) {
        edge.arrows = 'to';
        edge.length = 200;
    });

    return {
        nodes: nodes,
        edges: edges,
        lessons: lessons
    };
}

//exports.graphData = graphData;