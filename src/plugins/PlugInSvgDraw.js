// https://github.com/greensock/GreenSock-JS/blob/master/src/uncompressed/plugins/TEMPLATE_Plugin.js

export default function () {
  var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
  (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
    "use strict";

    function lerp(a, b, f) {
      return a + f * (b - a);
    }

    // from https://github.com/juliangarnier/anime/blob/master/anime.js

    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    function getCircleLength(el) {
      return 2 * Math.PI * el.getAttribute('r');
    }

    function getRectLength(el) {
      return (el.getAttribute('width') * 2) + (el.getAttribute('height') * 2);
    }

    function getLineLength(el) {
      return getDistance(
        {x: el.getAttribute('x1'), y: el.getAttribute('y1')},
        {x: el.getAttribute('x2'), y: el.getAttribute('y2')}
      );
    }

    function getPolylineLength(el) {
      const points = el.points;
      let totalLength = 0;
      let previousPos;
      for (let i = 0 ; i < points.numberOfItems; i++) {
        const currentPos = points.getItem(i);
        if (i > 0) totalLength += getDistance(previousPos, currentPos);
        previousPos = currentPos;
      }
      return totalLength;
    }

    function getPolygonLength(el) {
      const points = el.points;
      return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
    }
    
    function getPathLength(el) {
      if (!el.hasAttribute('d')) {
        return el.getTotalLength();
      }
      const d = el.getAttribute('d');
      const pathString = d.replace(/m/gi, 'M');

      const paths = pathString.split('M')
        .filter(path => path !== '')
        .map(path => `M${path}`);
  
      if (paths.length === 1) {
        return el.getTotalLength();
      }
  
      let maxLength = 0;

      paths.forEach(path => {
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', path);
        maxLength = Math.max(maxLength, pathElement.getTotalLength());
      });

      return maxLength;
    }

    function getTotalLength(el) {
      if (el.getTotalLength) {
        return getPathLength(el);
      }
      switch(el.tagName.toLowerCase()) {
        case 'circle': return getCircleLength(el);
        case 'rect': return getRectLength(el);
        case 'line': return getLineLength(el);
        case 'polyline': return getPolylineLength(el);
        case 'polygon': return getPolygonLength(el);
      }
    }

    _gsScope._gsDefine.plugin({
      propName: "svgDraw",
      priority: 0,
      API: 2,
      version: "1.0.0",
      overwriteProps: ["svgDraw"],

      init: function(target, value, tween, index) {
        this._target = target;
        this._length = getTotalLength(this._target);

        let length;
        let offset = null;

        if (Array.isArray(value) && value.length === 2) {
          length = value[0];
          offset = value[1] * -1;
        }
        else {
          length = value;
        }

        if (offset === null) {
          this._addTween(target, 'setAttribute', 'get', 0, 'stroke-dashoffset', null, 'stroke-dashoffset', null, index);
          this._addTween(target, 'setAttribute', 'get', [length * this._length, this._length], 'stroke-dasharray', null, 'stroke-dasharray', null, index);
        }
        else {
          this._addTween(target, 'setAttribute', 'get', this._length * offset, 'stroke-dashoffset', null, 'stroke-dashoffset', null, index);
          this._addTween(target, 'setAttribute', 'get', [length * this._length, this._length], 'stroke-dasharray', null, 'stroke-dasharray', null, index);
        }

        return true;
      },

    });
  });

  if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }
}
