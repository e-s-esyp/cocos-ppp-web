/**
 * @license
 * pixi.js - v1.4.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2014-01-08
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function () {
    function c() {
        return e.Matrix = "undefined" != typeof Float32Array ? Float32Array : Array, e.Matrix
    }

    var d = this, e = e || {};
    e.WEBGL_RENDERER = 0, e.CANVAS_RENDERER = 1, e.Point = function (a, b) {
        this.x = a || 0, this.y = b || 0
    }, e.Point.prototype.clone = function () {
        return new e.Point(this.x, this.y)
    }, e.Point.prototype.constructor = e.Point, e.Rectangle = function (a, b, c, d) {
        this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0
    }, e.Rectangle.prototype.clone = function () {
        return new e.Rectangle(this.x, this.y, this.width, this.height)
    }, e.Rectangle.prototype.contains = function (a, b) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var c = this.x;
        if (a >= c && a <= c + this.width) {
            var d = this.y;
            if (b >= d && b <= d + this.height) return !0
        }
        return !1
    }, e.Rectangle.prototype.constructor = e.Rectangle, e.Polygon = function (a) {
        if (a instanceof Array || (a = Array.prototype.slice.call(arguments)), "number" == typeof a[0]) {
            for (var b = [], c = 0, d = a.length; d > c; c += 2) b.push(new e.Point(a[c], a[c + 1]));
            a = b
        }
        this.points = a
    }, e.Polygon.prototype.clone = function () {
        for (var a = [], b = 0; b < this.points.length; b++) a.push(this.points[b].clone());
        return new e.Polygon(a)
    }, e.Polygon.prototype.contains = function (a, b) {
        for (var c = !1, d = 0, e = this.points.length - 1; d < this.points.length; e = d++) {
            var f = this.points[d].x, g = this.points[d].y, h = this.points[e].x, i = this.points[e].y,
                j = g > b != i > b && (h - f) * (b - g) / (i - g) + f > a;
            j && (c = !c)
        }
        return c
    }, e.Polygon.prototype.constructor = e.Polygon, e.Circle = function (a, b, c) {
        this.x = a || 0, this.y = b || 0, this.radius = c || 0
    }, e.Circle.prototype.clone = function () {
        return new e.Circle(this.x, this.y, this.radius)
    }, e.Circle.prototype.contains = function (a, b) {
        if (this.radius <= 0) return !1;
        var c = this.x - a, d = this.y - b, e = this.radius * this.radius;
        return c *= c, d *= d, e >= c + d
    }, e.Circle.prototype.constructor = e.Circle, e.Ellipse = function (a, b, c, d) {
        this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0
    }, e.Ellipse.prototype.clone = function () {
        return new e.Ellipse(this.x, this.y, this.width, this.height)
    }, e.Ellipse.prototype.contains = function (a, b) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var c = (a - this.x) / this.width - .5, d = (b - this.y) / this.height - .5;
        return c *= c, d *= d, .25 > c + d
    }, e.Ellipse.prototype.getBounds = function () {
        return new e.Rectangle(this.x, this.y, this.width, this.height)
    }, e.Ellipse.prototype.constructor = e.Ellipse, c(), e.mat3 = {}, e.mat3.create = function () {
        var a = new e.Matrix(9);
        return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
    }, e.mat3.identity = function (a) {
        return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
    }, e.mat4 = {}, e.mat4.create = function () {
        var a = new e.Matrix(16);
        return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
    }, e.mat3.multiply = function (a, b, c) {
        c || (c = a);
        var d = a[0], e = a[1], f = a[2], g = a[3], h = a[4], i = a[5], j = a[6], k = a[7], l = a[8], m = b[0],
            n = b[1], o = b[2], p = b[3], q = b[4], r = b[5], s = b[6], t = b[7], u = b[8];
        return c[0] = m * d + n * g + o * j, c[1] = m * e + n * h + o * k, c[2] = m * f + n * i + o * l, c[3] = p * d + q * g + r * j, c[4] = p * e + q * h + r * k, c[5] = p * f + q * i + r * l, c[6] = s * d + t * g + u * j, c[7] = s * e + t * h + u * k, c[8] = s * f + t * i + u * l, c
    }, e.mat3.clone = function (a) {
        var b = new e.Matrix(9);
        return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b
    }, e.mat3.transpose = function (a, b) {
        if (!b || a === b) {
            var c = a[1], d = a[2], e = a[5];
            return a[1] = a[3], a[2] = a[6], a[3] = c, a[5] = a[7], a[6] = d, a[7] = e, a
        }
        return b[0] = a[0], b[1] = a[3], b[2] = a[6], b[3] = a[1], b[4] = a[4], b[5] = a[7], b[6] = a[2], b[7] = a[5], b[8] = a[8], b
    }, e.mat3.toMat4 = function (a, b) {
        return b || (b = e.mat4.create()), b[15] = 1, b[14] = 0, b[13] = 0, b[12] = 0, b[11] = 0, b[10] = a[8], b[9] = a[7], b[8] = a[6], b[7] = 0, b[6] = a[5], b[5] = a[4], b[4] = a[3], b[3] = 0, b[2] = a[2], b[1] = a[1], b[0] = a[0], b
    }, e.mat4.create = function () {
        var a = new e.Matrix(16);
        return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
    }, e.mat4.transpose = function (a, b) {
        if (!b || a === b) {
            var c = a[1], d = a[2], e = a[3], f = a[6], g = a[7], h = a[11];
            return a[1] = a[4], a[2] = a[8], a[3] = a[12], a[4] = c, a[6] = a[9], a[7] = a[13], a[8] = d, a[9] = f, a[11] = a[14], a[12] = e, a[13] = g, a[14] = h, a
        }
        return b[0] = a[0], b[1] = a[4], b[2] = a[8], b[3] = a[12], b[4] = a[1], b[5] = a[5], b[6] = a[9], b[7] = a[13], b[8] = a[2], b[9] = a[6], b[10] = a[10], b[11] = a[14], b[12] = a[3], b[13] = a[7], b[14] = a[11], b[15] = a[15], b
    }, e.mat4.multiply = function (a, b, c) {
        c || (c = a);
        var d = a[0], e = a[1], f = a[2], g = a[3], h = a[4], i = a[5], j = a[6], k = a[7], l = a[8], m = a[9],
            n = a[10], o = a[11], p = a[12], q = a[13], r = a[14], s = a[15], t = b[0], u = b[1], v = b[2], w = b[3];
        return c[0] = t * d + u * h + v * l + w * p, c[1] = t * e + u * i + v * m + w * q, c[2] = t * f + u * j + v * n + w * r, c[3] = t * g + u * k + v * o + w * s, t = b[4], u = b[5], v = b[6], w = b[7], c[4] = t * d + u * h + v * l + w * p, c[5] = t * e + u * i + v * m + w * q, c[6] = t * f + u * j + v * n + w * r, c[7] = t * g + u * k + v * o + w * s, t = b[8], u = b[9], v = b[10], w = b[11], c[8] = t * d + u * h + v * l + w * p, c[9] = t * e + u * i + v * m + w * q, c[10] = t * f + u * j + v * n + w * r, c[11] = t * g + u * k + v * o + w * s, t = b[12], u = b[13], v = b[14], w = b[15], c[12] = t * d + u * h + v * l + w * p, c[13] = t * e + u * i + v * m + w * q, c[14] = t * f + u * j + v * n + w * r, c[15] = t * g + u * k + v * o + w * s, c
    }, e.identityMatrix = e.mat3.create(), e.DisplayObject = function () {
        this.last = this, this.first = this, this.position = new e.Point, this.scale = new e.Point(1, 1), this.pivot = new e.Point(0, 0), this.rotation = 0, this.alpha = 1, this.visible = !0, this.hitArea = null, this.buttonMode = !1, this.renderable = !1, this.parent = null, this.stage = null, this.worldAlpha = 1, this._interactive = !1, this.defaultCursor = "pointer", this.worldTransform = e.mat3.create(), this.localTransform = e.mat3.create(), this.color = [], this.dynamic = !0, this._sr = 0, this._cr = 1, this.filterArea = new e.Rectangle(0, 0, 1, 1), this._bounds = new e.Rectangle(0, 0, 1, 1), this._currentBounds = null, this._mask = null
    }, e.DisplayObject.prototype.constructor = e.DisplayObject, e.DisplayObject.prototype.setInteractive = function (a) {
        this.interactive = a
    }, Object.defineProperty(e.DisplayObject.prototype, "interactive", {
        get: function () {
            return this._interactive
        }, set: function (a) {
            this._interactive = a, this.stage && (this.stage.dirty = !0)
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "worldVisible", {
        get: function () {
            var a = this;
            do {
                if (!a.visible) return !1;
                a = a.parent
            } while (a);
            return !0
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "mask", {
        get: function () {
            return this._mask
        }, set: function (a) {
            this._mask && (this._mask.isMask = !1), this._mask = a, this._mask && (this._mask.isMask = !0)
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "filters", {
        get: function () {
            return this._filters
        }, set: function (a) {
            if (a) {
                for (var b = [], c = 0; c < a.length; c++) for (var d = a[c].passes, e = 0; e < d.length; e++) b.push(d[e]);
                this._filterBlock = {target: this, filterPasses: b}
            }
            this._filters = a
        }
    }), e.DisplayObject.prototype.updateTransform = function () {
        this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation));
        var a = this.localTransform, b = this.parent.worldTransform, c = this.worldTransform;
        a[0] = this._cr * this.scale.x, a[1] = -this._sr * this.scale.y, a[3] = this._sr * this.scale.x, a[4] = this._cr * this.scale.y;
        var d = this.pivot.x, f = this.pivot.y, g = a[0], h = a[1], i = this.position.x - a[0] * d - f * a[1], j = a[3],
            k = a[4], l = this.position.y - a[4] * f - d * a[3], m = b[0], n = b[1], o = b[2], p = b[3], q = b[4],
            r = b[5];
        a[2] = i, a[5] = l, c[0] = m * g + n * j, c[1] = m * h + n * k, c[2] = m * i + n * l + o, c[3] = p * g + q * j, c[4] = p * h + q * k, c[5] = p * i + q * l + r, this.worldAlpha = this.alpha * this.parent.worldAlpha, this.vcount = e.visibleCount
    }, e.DisplayObject.prototype.getBounds = function () {
        return e.EmptyRectangle
    }, e.DisplayObject.prototype.getLocalBounds = function () {
        var a = this.worldTransform;
        this.worldTransform = e.identityMatrix, this.updateTransform();
        var b = this.getBounds();
        return this.worldTransform = a, b
    }, e.DisplayObject.prototype.setStageReference = function (a) {
        this.stage = a, this._interactive && (this.stage.dirty = !0)
    }, e.DisplayObject.prototype._renderWebGL = function (a) {
        a = a
    }, e.DisplayObject.prototype._renderCanvas = function (a) {
        a = a
    }, e.EmptyRectangle = new e.Rectangle(0, 0, 0, 0), e.visibleCount = 0, e.DisplayObjectContainer = function () {
        e.DisplayObject.call(this), this.children = []
    }, e.DisplayObjectContainer.prototype = Object.create(e.DisplayObject.prototype), e.DisplayObjectContainer.prototype.constructor = e.DisplayObjectContainer, e.DisplayObjectContainer.prototype.addChild = function (a) {
        a.parent && a.parent !== this && a.parent.removeChild(a), a.parent = this, this.children.push(a), this.stage && a.setStageReference(this.stage)
    }, e.DisplayObjectContainer.prototype.addChildAt = function (a, b) {
        if (!(b >= 0 && b <= this.children.length)) throw new Error(a + " The index " + b + " supplied is out of bounds " + this.children.length);
        a.parent && a.parent.removeChild(a), a.parent = this, this.children.splice(b, 0, a), this.stage && a.setStageReference(this.stage)
    }, e.DisplayObjectContainer.prototype.swapChildren = function (a, b) {
        if (a !== b) {
            var c = this.children.indexOf(a), d = this.children.indexOf(b);
            if (0 > c || 0 > d) throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");
            this.children[c] = b, this.children[d] = a
        }
    }, e.DisplayObjectContainer.prototype.getChildAt = function (a) {
        if (a >= 0 && a < this.children.length) return this.children[a];
        throw new Error("The supplied DisplayObjects must be a child of the caller " + this)
    }, e.DisplayObjectContainer.prototype.removeChild = function (a) {
        var b = this.children.indexOf(a);
        if (-1 === b) throw new Error(a + " The supplied DisplayObject must be a child of the caller " + this);
        this.stage && a.removeStageReference(), a.parent = void 0, this.children.splice(b, 1)
    }, e.DisplayObjectContainer.prototype.updateTransform = function () {
        if (this.visible) {
            e.DisplayObject.prototype.updateTransform.call(this);
            for (var a = 0, b = this.children.length; b > a; a++) this.children[a].updateTransform()
        }
    }, e.DisplayObjectContainer.prototype.getBounds = function () {
        if (0 === this.children.length) return e.EmptyRectangle;
        for (var a, b, c, d = 1 / 0, f = 1 / 0, g = -1 / 0, h = -1 / 0, i = 0, j = this.children.length; j > i; i++) {
            var k = this.children[i];
            k.visible && (a = this.children[i].getBounds(), d = d < a.x ? d : a.x, f = f < a.y ? f : a.y, b = a.width + a.x, c = a.height + a.y, g = g > b ? g : b, h = h > c ? h : c)
        }
        var l = this._bounds;
        return l.x = d, l.y = f, l.width = g - d, l.height = h - f, l
    }, e.DisplayObjectContainer.prototype.setStageReference = function (a) {
        this.stage = a, this._interactive && (this.stage.dirty = !0);
        for (var b = 0, c = this.children.length; c > b; b++) {
            var d = this.children[b];
            d.setStageReference(a)
        }
    }, e.DisplayObjectContainer.prototype.removeStageReference = function () {
        for (var a = 0, b = this.children.length; b > a; a++) {
            var c = this.children[a];
            c.removeStageReference()
        }
        this._interactive && (this.stage.dirty = !0), this.stage = null
    }, e.DisplayObjectContainer.prototype._renderWebGL = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha) {
            var b, c;
            if (this._mask || this._filters) {
                for (this._mask && (a.spriteBatch.stop(), a.maskManager.pushMask(this.mask, a), a.spriteBatch.start()), this._filters && (a.spriteBatch.flush(), a.filterManager.pushFilter(this._filterBlock)), b = 0, c = this.children.length; c > b; b++) this.children[b]._renderWebGL(a);
                a.spriteBatch.stop(), this._filters && a.filterManager.popFilter(), this._mask && a.maskManager.popMask(a), a.spriteBatch.start()
            } else for (b = 0, c = this.children.length; c > b; b++) this.children[b]._renderWebGL(a)
        }
    }, e.DisplayObjectContainer.prototype._renderCanvas = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha) {
            this._mask && a.maskManager.pushMask(this._mask, a.context);
            for (var b = 0, c = this.children.length; c > b; b++) {
                var d = this.children[b];
                d._renderCanvas(a)
            }
            this._mask && a.maskManager.popMask(a.context)
        }
    }, e.blendModes = {}, e.blendModes.NORMAL = 0, e.blendModes.ADD = 1, e.blendModes.MULTIPLY = 2, e.blendModes.SCREEN = 3, e.Sprite = function (a) {
        e.DisplayObjectContainer.call(this), this.anchor = new e.Point, this.texture = a, this._width = 0, this._height = 0, this.tint = 16777215, this.blendMode = e.blendModes.NORMAL, a.baseTexture.hasLoaded ? this.onTextureUpdate() : (this.onTextureUpdateBind = this.onTextureUpdate.bind(this), this.texture.addEventListener("update", this.onTextureUpdateBind)), this.renderable = !0
    }, e.Sprite.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Sprite.prototype.constructor = e.Sprite, Object.defineProperty(e.Sprite.prototype, "width", {
        get: function () {
            return this.scale.x * this.texture.frame.width
        }, set: function (a) {
            this.scale.x = a / this.texture.frame.width, this._width = a
        }
    }), Object.defineProperty(e.Sprite.prototype, "height", {
        get: function () {
            return this.scale.y * this.texture.frame.height
        }, set: function (a) {
            this.scale.y = a / this.texture.frame.height, this._height = a
        }
    }), e.Sprite.prototype.setTexture = function (a) {
        this.texture.baseTexture !== a.baseTexture ? (this.textureChange = !0, this.texture = a) : this.texture = a, this.cachedTint = 16777215, this.updateFrame = !0
    }, e.Sprite.prototype.onTextureUpdate = function () {
        this._width && (this.scale.x = this._width / this.texture.frame.width), this._height && (this.scale.y = this._height / this.texture.frame.height), this.updateFrame = !0
    }, e.Sprite.prototype.getBounds = function () {
        var a = this.texture.frame.width, b = this.texture.frame.height, c = a * (1 - this.anchor.x),
            d = a * -this.anchor.x, e = b * (1 - this.anchor.y), f = b * -this.anchor.y, g = this.worldTransform,
            h = g[0], i = g[3], j = g[1], k = g[4], l = g[2], m = g[5], n = h * d + j * f + l, o = k * f + i * d + m,
            p = h * c + j * f + l, q = k * f + i * c + m, r = h * c + j * e + l, s = k * e + i * c + m,
            t = h * d + j * e + l, u = k * e + i * d + m, v = -1 / 0, w = -1 / 0, x = 1 / 0, y = 1 / 0;
        x = x > n ? n : x, x = x > p ? p : x, x = x > r ? r : x, x = x > t ? t : x, y = y > o ? o : y, y = y > q ? q : y, y = y > s ? s : y, y = y > u ? u : y, v = n > v ? n : v, v = p > v ? p : v, v = r > v ? r : v, v = t > v ? t : v, w = o > w ? o : w, w = q > w ? q : w, w = s > w ? s : w, w = u > w ? u : w;
        var z = this._bounds;
        return z.x = x, z.width = v - x, z.y = y, z.height = w - y, this._currentBounds = z, z
    }, e.Sprite.prototype._renderWebGL = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha) {
            var b, c;
            if (this._mask || this._filters) {
                var d = a.spriteBatch;
                for (this._mask && (d.stop(), a.maskManager.pushMask(this.mask, a), d.start()), this._filters && (d.flush(), a.filterManager.pushFilter(this._filterBlock)), d.render(this), b = 0, c = this.children.length; c > b; b++) this.children[b]._renderWebGL(a);
                d.stop(), this._filters && a.filterManager.popFilter(), this._mask && a.maskManager.popMask(a), d.start()
            } else for (a.spriteBatch.render(this), b = 0, c = this.children.length; c > b; b++) this.children[b]._renderWebGL(a)
        }
    }, e.Sprite.prototype._renderCanvas = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha) {
            this._mask && a.maskManager.pushMask(this._mask, a.context);
            var b = this.texture.frame, c = a.context, d = this.texture;
            if (b && b.width && b.height && d.baseTexture.source) {
                c.globalAlpha = this.worldAlpha;
                var f = this.worldTransform;
                if (c.setTransform(f[0], f[3], f[1], f[4], f[2], f[5]), this.blendMode !== a.currentBlendMode && (a.currentBlendMode = this.blendMode, c.globalCompositeOperation = e.blendModesCanvas[a.currentBlendMode]), 16777215 !== this.tint) {
                    if (this.cachedTint !== this.tint) {
                        if (!d.baseTexture.hasLoaded) return;
                        this.cachedTint = this.tint, this.tintedTexture = e.CanvasTinter.getTintedTexture(this, this.tint)
                    }
                    c.drawImage(this.tintedTexture, 0, 0, b.width, b.height, this.anchor.x * -b.width, this.anchor.y * -b.height, b.width, b.height)
                } else if (d.trimmed) {
                    var g = d.trim;
                    c.drawImage(this.texture.baseTexture.source, b.x, b.y, b.width, b.height, g.x - this.anchor.x * g.realWidth, g.y - this.anchor.y * g.realHeight, b.width, b.height)
                } else c.drawImage(this.texture.baseTexture.source, b.x, b.y, b.width, b.height, this.anchor.x * -b.width, this.anchor.y * -b.height, b.width, b.height)
            }
            for (var h = 0, i = this.children.length; i > h; h++) {
                var j = this.children[h];
                j._renderCanvas(a)
            }
            this._mask && a.maskManager.popMask(a.context)
        }
    }, e.Sprite.fromFrame = function (a) {
        var b = e.TextureCache[a];
        if (!b) throw new Error('The frameId "' + a + '" does not exist in the texture cache' + this);
        return new e.Sprite(b)
    }, e.Sprite.fromImage = function (a) {
        var b = e.Texture.fromImage(a);
        return new e.Sprite(b)
    }, e.MovieClip = function (a) {
        e.Sprite.call(this, a[0]), this.textures = a, this.animationSpeed = 1, this.loop = !0, this.onComplete = null, this.currentFrame = 0, this.playing = !1
    }, e.MovieClip.prototype = Object.create(e.Sprite.prototype), e.MovieClip.prototype.constructor = e.MovieClip, Object.defineProperty(e.MovieClip.prototype, "totalFrames", {
        get: function () {
            return this.textures.length
        }
    }), e.MovieClip.prototype.stop = function () {
        this.playing = !1
    }, e.MovieClip.prototype.play = function () {
        this.playing = !0
    }, e.MovieClip.prototype.gotoAndStop = function (a) {
        this.playing = !1, this.currentFrame = a;
        var b = this.currentFrame + .5 | 0;
        this.setTexture(this.textures[b % this.textures.length])
    }, e.MovieClip.prototype.gotoAndPlay = function (a) {
        this.currentFrame = a, this.playing = !0
    }, e.MovieClip.prototype.updateTransform = function () {
        if (e.Sprite.prototype.updateTransform.call(this), this.playing) {
            this.currentFrame += this.animationSpeed;
            var a = this.currentFrame + .5 | 0;
            this.loop || a < this.textures.length ? this.setTexture(this.textures[a % this.textures.length]) : a >= this.textures.length && (this.gotoAndStop(this.textures.length - 1), this.onComplete && this.onComplete())
        }
    }, e.FilterBlock = function () {
        this.visible = !0, this.renderable = !0
    }, e.Text = function (a, b) {
        this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), e.Sprite.call(this, e.Texture.fromCanvas(this.canvas)), this.setText(a), this.setStyle(b), this.updateText(), this.dirty = !1
    }, e.Text.prototype = Object.create(e.Sprite.prototype), e.Text.prototype.constructor = e.Text, e.Text.prototype.setStyle = function (a) {
        a = a || {}, a.font = a.font || "bold 20pt Arial", a.fill = a.fill || "black", a.align = a.align || "left", a.stroke = a.stroke || "black", a.strokeThickness = a.strokeThickness || 0, a.wordWrap = a.wordWrap || !1, a.wordWrapWidth = a.wordWrapWidth || 100, this.style = a, this.dirty = !0
    }, e.Text.prototype.setText = function (a) {
        this.text = a.toString() || " ", this.dirty = !0
    }, e.Text.prototype.updateText = function () {
        this.context.font = this.style.font;
        var a = this.text;
        this.style.wordWrap && (a = this.wordWrap(this.text));
        for (var b = a.split(/(?:\r\n|\r|\n)/), c = [], d = 0, f = 0; f < b.length; f++) {
            var g = this.context.measureText(b[f]).width;
            c[f] = g, d = Math.max(d, g)
        }
        this.canvas.width = d + this.style.strokeThickness;
        var h = this.determineFontHeight("font: " + this.style.font + ";") + this.style.strokeThickness;
        for (this.canvas.height = h * b.length, this.context.fillStyle = this.style.fill, this.context.font = this.style.font, this.context.strokeStyle = this.style.stroke, this.context.lineWidth = this.style.strokeThickness, this.context.textBaseline = "top", f = 0; f < b.length; f++) {
            var i = new e.Point(this.style.strokeThickness / 2, this.style.strokeThickness / 2 + f * h);
            "right" === this.style.align ? i.x += d - c[f] : "center" === this.style.align && (i.x += (d - c[f]) / 2), this.style.stroke && this.style.strokeThickness && this.context.strokeText(b[f], i.x, i.y), this.style.fill && this.context.fillText(b[f], i.x, i.y)
        }
        this.updateTexture()
    }, e.Text.prototype.updateTexture = function () {
        this.texture.baseTexture.width = this.canvas.width, this.texture.baseTexture.height = this.canvas.height, this.texture.frame.width = this.canvas.width, this.texture.frame.height = this.canvas.height, this._width = this.canvas.width, this._height = this.canvas.height, this.requiresUpdate = !0
    }, e.Text.prototype._renderWebGL = function (a) {
        this.requiresUpdate && (this.requiresUpdate = !1, e.updateWebGLTexture(this.texture.baseTexture, a.gl)), e.Sprite.prototype._renderWebGL.call(this, a)
    }, e.Text.prototype.updateTransform = function () {
        this.dirty && (this.updateText(), this.dirty = !1), e.Sprite.prototype.updateTransform.call(this)
    },e.Text.prototype.determineFontHeight = function (a) {
        var b = e.Text.heightCache[a];
        if (!b) {
            var c = document.getElementsByTagName("body")[0], d = document.createElement("div"),
                f = document.createTextNode("M");
            d.appendChild(f), d.setAttribute("style", a + ";position:absolute;top:0;left:0"), c.appendChild(d), b = d.offsetHeight, e.Text.heightCache[a] = b, c.removeChild(d)
        }
        return b
    },e.Text.prototype.wordWrap = function (a) {
        for (var b = "", c = a.split("\n"), d = 0; d < c.length; d++) {
            for (var e = this.style.wordWrapWidth, f = c[d].split(" "), g = 0; g < f.length; g++) {
                var h = this.context.measureText(f[g]).width, i = h + this.context.measureText(" ").width;
                i > e ? (g > 0 && (b += "\n"), b += f[g] + " ", e = this.style.wordWrapWidth - h) : (e -= i, b += f[g] + " ")
            }
            b += "\n"
        }
        return b
    },e.Text.prototype.destroy = function (a) {
        a && this.texture.destroy()
    },e.Text.heightCache = {},e.BitmapText = function (a, b) {
        e.DisplayObjectContainer.call(this), this.setText(a), this.setStyle(b), this.updateText(), this.dirty = !1
    },e.BitmapText.prototype = Object.create(e.DisplayObjectContainer.prototype),e.BitmapText.prototype.constructor = e.BitmapText,e.BitmapText.prototype.setText = function (a) {
        this.text = a || " ", this.dirty = !0
    },e.BitmapText.prototype.setStyle = function (a) {
        a = a || {}, a.align = a.align || "left", this.style = a;
        var b = a.font.split(" ");
        this.fontName = b[b.length - 1], this.fontSize = b.length >= 2 ? parseInt(b[b.length - 2], 10) : e.BitmapText.fonts[this.fontName].size, this.dirty = !0
    },e.BitmapText.prototype.updateText = function () {
        for (var a = e.BitmapText.fonts[this.fontName], b = new e.Point, c = null, d = [], f = 0, g = [], h = 0, i = this.fontSize / a.size, j = 0; j < this.text.length; j++) {
            var k = this.text.charCodeAt(j);
            if (/(?:\r\n|\r|\n)/.test(this.text.charAt(j))) g.push(b.x), f = Math.max(f, b.x), h++, b.x = 0, b.y += a.lineHeight, c = null; else {
                var l = a.chars[k];
                l && (c && l[c] && (b.x += l.kerning[c]), d.push({
                    texture: l.texture,
                    line: h,
                    charCode: k,
                    position: new e.Point(b.x + l.xOffset, b.y + l.yOffset)
                }), b.x += l.xAdvance, c = k)
            }
        }
        g.push(b.x), f = Math.max(f, b.x);
        var m = [];
        for (j = 0; h >= j; j++) {
            var n = 0;
            "right" === this.style.align ? n = f - g[j] : "center" === this.style.align && (n = (f - g[j]) / 2), m.push(n)
        }
        for (j = 0; j < d.length; j++) {
            var o = new e.Sprite(d[j].texture);
            o.position.x = (d[j].position.x + m[d[j].line]) * i, o.position.y = d[j].position.y * i, o.scale.x = o.scale.y = i, this.addChild(o)
        }
        this.width = f * i, this.height = (b.y + a.lineHeight) * i
    },e.BitmapText.prototype.updateTransform = function () {
        if (this.dirty) {
            for (; this.children.length > 0;) this.removeChild(this.getChildAt(0));
            this.updateText(), this.dirty = !1
        }
        e.DisplayObjectContainer.prototype.updateTransform.call(this)
    },e.BitmapText.fonts = {},e.InteractionManager = function (a) {
        this.stage = a, this.mouse = new e.InteractionData, this.touchs = {}, this.tempPoint = new e.Point, this.mouseoverEnabled = !0, this.pool = [], this.interactiveItems = [], this.interactionDOMElement = null, this.onMouseMove = this.onMouseMove.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.last = 0
    },e.InteractionManager.prototype.constructor = e.InteractionManager,e.InteractionManager.prototype.collectInteractiveSprite = function (a, b) {
        for (var c = a.children, d = c.length, e = d - 1; e >= 0; e--) {
            var f = c[e];
            f.interactive ? (b.interactiveChildren = !0, this.interactiveItems.push(f), f.children.length > 0 && this.collectInteractiveSprite(f, f)) : (f.__iParent = null, f.children.length > 0 && this.collectInteractiveSprite(f, b))
        }
    },e.InteractionManager.prototype.setTarget = function (a) {
        this.target = a, null === this.interactionDOMElement && this.setTargetDomElement(a.view), document.body.addEventListener("mouseup", this.onMouseUp, !0)
    },e.InteractionManager.prototype.setTargetDomElement = function (a) {
        null !== this.interactionDOMElement && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "", this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0)), window.navigator.msPointerEnabled && (a.style["-ms-content-zooming"] = "none", a.style["-ms-touch-action"] = "none"), this.interactionDOMElement = a, a.addEventListener("mousemove", this.onMouseMove, !0), a.addEventListener("mousedown", this.onMouseDown, !0), a.addEventListener("mouseout", this.onMouseOut, !0), a.addEventListener("touchstart", this.onTouchStart, !0), a.addEventListener("touchend", this.onTouchEnd, !0), a.addEventListener("touchmove", this.onTouchMove, !0)
    },e.InteractionManager.prototype.update = function () {
        if (this.target) {
            var a = Date.now(), b = a - this.last;
            if (b = 30 * b / 1e3, !(1 > b)) {
                this.last = a;
                var c = 0;
                if (this.dirty) {
                    this.dirty = !1;
                    var d = this.interactiveItems.length;
                    for (c = 0; d > c; c++) this.interactiveItems[c].interactiveChildren = !1;
                    this.interactiveItems = [], this.stage.interactive && this.interactiveItems.push(this.stage), this.collectInteractiveSprite(this.stage, this.stage)
                }
                var e = this.interactiveItems.length;
                for (this.interactionDOMElement.style.cursor = "inherit", c = 0; e > c; c++) {
                    var f = this.interactiveItems[c];
                    (f.mouseover || f.mouseout || f.buttonMode) && (f.__hit = this.hitTest(f, this.mouse), this.mouse.target = f, f.__hit ? (f.buttonMode && (this.interactionDOMElement.style.cursor = f.defaultCursor), f.__isOver || (f.mouseover && f.mouseover(this.mouse), f.__isOver = !0)) : f.__isOver && (f.mouseout && f.mouseout(this.mouse), f.__isOver = !1))
                }
            }
        }
    },e.InteractionManager.prototype.onMouseMove = function (a) {
        this.mouse.originalEvent = a || window.event;
        var b = this.interactionDOMElement.getBoundingClientRect();
        this.mouse.global.x = (a.clientX - b.left) * (this.target.width / b.width), this.mouse.global.y = (a.clientY - b.top) * (this.target.height / b.height);
        for (var c = this.interactiveItems.length, d = 0; c > d; d++) {
            var e = this.interactiveItems[d];
            e.mousemove && e.mousemove(this.mouse)
        }
    },e.InteractionManager.prototype.onMouseDown = function (a) {
        this.mouse.originalEvent = a || window.event;
        for (var b = this.interactiveItems.length, c = 0; b > c; c++) {
            var d = this.interactiveItems[c];
            if ((d.mousedown || d.click) && (d.__mouseIsDown = !0, d.__hit = this.hitTest(d, this.mouse), d.__hit && (d.mousedown && d.mousedown(this.mouse), d.__isDown = !0, !d.interactiveChildren))) break
        }
    },e.InteractionManager.prototype.onMouseOut = function () {
        var a = this.interactiveItems.length;
        this.interactionDOMElement.style.cursor = "inherit";
        for (var b = 0; a > b; b++) {
            var c = this.interactiveItems[b];
            c.__isOver && (this.mouse.target = c, c.mouseout && c.mouseout(this.mouse), c.__isOver = !1)
        }
    },e.InteractionManager.prototype.onMouseUp = function (a) {
        this.mouse.originalEvent = a || window.event;
        for (var b = this.interactiveItems.length, c = !1, d = 0; b > d; d++) {
            var e = this.interactiveItems[d];
            (e.mouseup || e.mouseupoutside || e.click) && (e.__hit = this.hitTest(e, this.mouse), e.__hit && !c ? (e.mouseup && e.mouseup(this.mouse), e.__isDown && e.click && e.click(this.mouse), e.interactiveChildren || (c = !0)) : e.__isDown && e.mouseupoutside && e.mouseupoutside(this.mouse), e.__isDown = !1)
        }
    },e.InteractionManager.prototype.hitTest = function (a, b) {
        var c = b.global;
        if (!a.worldVisible) return !1;
        var d = a instanceof e.Sprite, f = a.worldTransform, g = f[0], h = f[1], i = f[2], j = f[3], k = f[4], l = f[5],
            m = 1 / (g * k + h * -j), n = k * m * c.x + -h * m * c.y + (l * h - i * k) * m,
            o = g * m * c.y + -j * m * c.x + (-l * g + i * j) * m;
        if (b.target = a, a.hitArea && a.hitArea.contains) return a.hitArea.contains(n, o) ? (b.target = a, !0) : !1;
        if (d) {
            var p, q = a.texture.frame.width, r = a.texture.frame.height, s = -q * a.anchor.x;
            if (n > s && s + q > n && (p = -r * a.anchor.y, o > p && p + r > o)) return b.target = a, !0
        }
        for (var t = a.children.length, u = 0; t > u; u++) {
            var v = a.children[u], w = this.hitTest(v, b);
            if (w) return b.target = a, !0
        }
        return !1
    },e.InteractionManager.prototype.onTouchMove = function (a) {
        var b, c = this.interactionDOMElement.getBoundingClientRect(), d = a.changedTouches, e = 0;
        for (e = 0; e < d.length; e++) {
            var f = d[e];
            b = this.touchs[f.identifier], b.originalEvent = a || window.event, b.global.x = (f.clientX - c.left) * (this.target.width / c.width), b.global.y = (f.clientY - c.top) * (this.target.height / c.height)
        }
        var g = this.interactiveItems.length;
        for (e = 0; g > e; e++) {
            var h = this.interactiveItems[e];
            h.touchmove && h.touchmove(b)
        }
    },e.InteractionManager.prototype.onTouchStart = function (a) {
        for (var b = this.interactionDOMElement.getBoundingClientRect(), c = a.changedTouches, d = 0; d < c.length; d++) {
            var f = c[d], g = this.pool.pop();
            g || (g = new e.InteractionData), g.originalEvent = a || window.event, this.touchs[f.identifier] = g, g.global.x = (f.clientX - b.left) * (this.target.width / b.width), g.global.y = (f.clientY - b.top) * (this.target.height / b.height);
            for (var h = this.interactiveItems.length, i = 0; h > i; i++) {
                var j = this.interactiveItems[i];
                if ((j.touchstart || j.tap) && (j.__hit = this.hitTest(j, g), j.__hit && (j.touchstart && j.touchstart(g), j.__isDown = !0, j.__touchData = g, !j.interactiveChildren))) break
            }
        }
    },e.InteractionManager.prototype.onTouchEnd = function (a) {
        for (var b = this.interactionDOMElement.getBoundingClientRect(), c = a.changedTouches, d = 0; d < c.length; d++) {
            var e = c[d], f = this.touchs[e.identifier], g = !1;
            f.global.x = (e.clientX - b.left) * (this.target.width / b.width), f.global.y = (e.clientY - b.top) * (this.target.height / b.height);
            for (var h = this.interactiveItems.length, i = 0; h > i; i++) {
                var j = this.interactiveItems[i], k = j.__touchData;
                j.__hit = this.hitTest(j, f), k === f && (f.originalEvent = a || window.event, (j.touchend || j.tap) && (j.__hit && !g ? (j.touchend && j.touchend(f), j.__isDown && j.tap && j.tap(f), j.interactiveChildren || (g = !0)) : j.__isDown && j.touchendoutside && j.touchendoutside(f), j.__isDown = !1), j.__touchData = null)
            }
            this.pool.push(f), this.touchs[e.identifier] = null
        }
    },e.InteractionData = function () {
        this.global = new e.Point, this.local = new e.Point, this.target = null, this.originalEvent = null
    },e.InteractionData.prototype.getLocalPosition = function (a) {
        var b = a.worldTransform, c = this.global, d = b[0], f = b[1], g = b[2], h = b[3], i = b[4], j = b[5],
            k = 1 / (d * i + f * -h);
        return new e.Point(i * k * c.x + -f * k * c.y + (j * f - g * i) * k, d * k * c.y + -h * k * c.x + (-j * d + g * h) * k)
    },e.InteractionData.prototype.constructor = e.InteractionData,e.Stage = function (a) {
        e.DisplayObjectContainer.call(this), this.worldTransform = e.mat3.create(), this.interactive = !0, this.interactionManager = new e.InteractionManager(this), this.dirty = !0, this.stage = this, this.stage.hitArea = new e.Rectangle(0, 0, 1e5, 1e5), this.setBackgroundColor(a)
    },e.Stage.prototype = Object.create(e.DisplayObjectContainer.prototype),e.Stage.prototype.constructor = e.Stage,e.Stage.prototype.setInteractionDelegate = function (a) {
        this.interactionManager.setTargetDomElement(a)
    },e.Stage.prototype.updateTransform = function () {
        this.worldAlpha = 1, this.vcount = e.visibleCount;
        for (var a = 0, b = this.children.length; b > a; a++) this.children[a].updateTransform();
        this.dirty && (this.dirty = !1, this.interactionManager.dirty = !0), this.interactive && this.interactionManager.update()
    },e.Stage.prototype.setBackgroundColor = function (a) {
        this.backgroundColor = a || 0, this.backgroundColorSplit = e.hex2rgb(this.backgroundColor);
        var b = this.backgroundColor.toString(16);
        b = "000000".substr(0, 6 - b.length) + b, this.backgroundColorString = "#" + b
    },e.Stage.prototype.getMousePosition = function () {
        return this.interactionManager.mouse.global
    };
    for (var f = 0, h = ["ms", "moz", "webkit", "o"], i = 0; i < h.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[h[i] + "CancelAnimationFrame"] || window[h[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (a) {
        var b = (new Date).getTime(), c = Math.max(0, 16 - (b - f)), d = window.setTimeout(function () {
            a(b + c)
        }, c);
        return f = b + c, d
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
        clearTimeout(a)
    }), window.requestAnimFrame = window.requestAnimationFrame, e.hex2rgb = function (a) {
        return [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (255 & a) / 255]
    }, e.rgb2hex = function (a) {
        return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
    }, "function" != typeof Function.prototype.bind && (Function.prototype.bind = function () {
        var a = Array.prototype.slice;
        return function (b) {
            function c() {
                var f = e.concat(a.call(arguments));
                d.apply(this instanceof c ? this : b, f)
            }

            var d = this, e = a.call(arguments, 1);
            if ("function" != typeof d) throw new TypeError;
            return c.prototype = function f(a) {
                return a && (f.prototype = a), this instanceof f ? void 0 : new f
            }(d.prototype), c
        }
    }()), e.AjaxRequest = function () {
        var a = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
        if (!window.ActiveXObject) return window.XMLHttpRequest ? new window.XMLHttpRequest : !1;
        for (var b = 0; b < a.length; b++) try {
            return new window.ActiveXObject(a[b])
        } catch (c) {
        }
    }, e.canUseNewCanvasBlendModes = function () {
        var a = document.createElement("canvas");
        a.width = 1, a.height = 1;
        var b = a.getContext("2d");
        return b.fillStyle = "#000", b.fillRect(0, 0, 1, 1), b.globalCompositeOperation = "multiply", b.fillStyle = "#fff", b.fillRect(0, 0, 1, 1), 0 === b.getImageData(0, 0, 1, 1).data[0]
    }, e.getNextPowerOfTwo = function (a) {
        if (a > 0 && 0 === (a & a - 1)) return a;
        for (var b = 1; a > b;) b <<= 1;
        return b
    }, e.EventTarget = function () {
        var a = {};
        this.addEventListener = this.on = function (b, c) {
            void 0 === a[b] && (a[b] = []), -1 === a[b].indexOf(c) && a[b].push(c)
        }, this.dispatchEvent = this.emit = function (b) {
            if (a[b.type] && a[b.type].length) for (var c = 0, d = a[b.type].length; d > c; c++) a[b.type][c](b)
        }, this.removeEventListener = this.off = function (b, c) {
            var d = a[b].indexOf(c);
            -1 !== d && a[b].splice(d, 1)
        }, this.removeAllEventListeners = function (b) {
            var c = a[b];
            c && (c.length = 0)
        }
    }, e.autoDetectRenderer = function (a, b, c, d, f) {
        a || (a = 800), b || (b = 600);
        var g = function () {
            try {
                var a = document.createElement("canvas");
                return !!window.WebGLRenderingContext && (a.getContext("webgl") || a.getContext("experimental-webgl"))
            } catch (b) {
                return !1
            }
        }();
        if (g) {
            var h = -1 !== navigator.userAgent.toLowerCase().indexOf("trident");
            g = !h
        }
        return g ? new e.WebGLRenderer(a, b, c, d, f) : new e.CanvasRenderer(a, b, c, d)
    }, e.PolyK = {}, e.PolyK.Triangulate = function (a) {
        var b = !0, c = a.length >> 1;
        if (3 > c) return [];
        for (var d = [], f = [], g = 0; c > g; g++) f.push(g);
        g = 0;
        for (var h = c; h > 3;) {
            var i = f[(g + 0) % h], j = f[(g + 1) % h], k = f[(g + 2) % h], l = a[2 * i], m = a[2 * i + 1],
                n = a[2 * j], o = a[2 * j + 1], p = a[2 * k], q = a[2 * k + 1], r = !1;
            if (e.PolyK._convex(l, m, n, o, p, q, b)) {
                r = !0;
                for (var s = 0; h > s; s++) {
                    var t = f[s];
                    if (t !== i && t !== j && t !== k && e.PolyK._PointInTriangle(a[2 * t], a[2 * t + 1], l, m, n, o, p, q)) {
                        r = !1;
                        break
                    }
                }
            }
            if (r) d.push(i, j, k), f.splice((g + 1) % h, 1), h--, g = 0; else if (g++ > 3 * h) {
                if (!b) return window.console.log("PIXI Warning: shape too complex to fill"), [];
                for (d = [], f = [], g = 0; c > g; g++) f.push(g);
                g = 0, h = c, b = !1
            }
        }
        return d.push(f[0], f[1], f[2]), d
    }, e.PolyK._PointInTriangle = function (a, b, c, d, e, f, g, h) {
        var i = g - c, j = h - d, k = e - c, l = f - d, m = a - c, n = b - d, o = i * i + j * j, p = i * k + j * l,
            q = i * m + j * n, r = k * k + l * l, s = k * m + l * n, t = 1 / (o * r - p * p), u = (r * q - p * s) * t,
            v = (o * s - p * q) * t;
        return u >= 0 && v >= 0 && 1 > u + v
    }, e.PolyK._convex = function (a, b, c, d, e, f, g) {
        return (b - d) * (e - c) + (c - a) * (f - d) >= 0 === g
    }, e.initDefaultShaders = function () {
    }, e.CompileVertexShader = function (a, b) {
        return e._CompileShader(a, b, a.VERTEX_SHADER)
    }, e.CompileFragmentShader = function (a, b) {
        return e._CompileShader(a, b, a.FRAGMENT_SHADER)
    }, e._CompileShader = function (a, b, c) {
        var d = b.join("\n"), e = a.createShader(c);
        return a.shaderSource(e, d), a.compileShader(e), a.getShaderParameter(e, a.COMPILE_STATUS) ? e : (window.console.log(a.getShaderInfoLog(e)), null)
    }, e.compileProgram = function (a, b, c) {
        var d = e.CompileFragmentShader(a, c), f = e.CompileVertexShader(a, b), g = a.createProgram();
        return a.attachShader(g, f), a.attachShader(g, d), a.linkProgram(g), a.getProgramParameter(g, a.LINK_STATUS) || window.console.log("Could not initialise shaders"), g
    }, e.PixiShader = function (a) {
        this.gl = a, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.textureCount = 0, this.init()
    }, e.PixiShader.prototype.init = function () {
        var a = this.gl, b = e.compileProgram(a, this.vertexSrc || e.PixiShader.defaultVertexSrc, this.fragmentSrc);
        a.useProgram(b), this.uSampler = a.getUniformLocation(b, "uSampler"), this.projectionVector = a.getUniformLocation(b, "projectionVector"), this.offsetVector = a.getUniformLocation(b, "offsetVector"), this.dimensions = a.getUniformLocation(b, "dimensions"), this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"), this.aTextureCoord = a.getAttribLocation(b, "aTextureCoord"), this.colorAttribute = a.getAttribLocation(b, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2);
        for (var c in this.uniforms) this.uniforms[c].uniformLocation = a.getUniformLocation(b, c);
        this.initUniforms(), this.program = b
    }, e.PixiShader.prototype.initUniforms = function () {
        this.textureCount = 1;
        var a, b = this.gl;
        for (var c in this.uniforms) {
            a = this.uniforms[c];
            var d = a.type;
            "sampler2D" === d ? (a._init = !1, null !== a.value && this.initSampler2D(a)) : "mat2" === d || "mat3" === d || "mat4" === d ? (a.glMatrix = !0, a.glValueLength = 1, "mat2" === d ? a.glFunc = b.uniformMatrix2fv : "mat3" === d ? a.glFunc = b.uniformMatrix3fv : "mat4" === d && (a.glFunc = b.uniformMatrix4fv)) : (a.glFunc = b["uniform" + d], a.glValueLength = "2f" === d || "2i" === d ? 2 : "3f" === d || "3i" === d ? 3 : "4f" === d || "4i" === d ? 4 : 1)
        }
    }, e.PixiShader.prototype.initSampler2D = function (a) {
        if (a.value && a.value.baseTexture && a.value.baseTexture.hasLoaded) {
            var b = this.gl;
            if (b.activeTexture(b["TEXTURE" + this.textureCount]), b.bindTexture(b.TEXTURE_2D, a.value.baseTexture._glTexture), a.textureData) {
                var c = a.textureData, d = c.magFilter ? c.magFilter : b.LINEAR,
                    e = c.minFilter ? c.minFilter : b.LINEAR, f = c.wrapS ? c.wrapS : b.CLAMP_TO_EDGE,
                    g = c.wrapT ? c.wrapT : b.CLAMP_TO_EDGE, h = c.luminance ? b.LUMINANCE : b.RGBA;
                if (c.repeat && (f = b.REPEAT, g = b.REPEAT), b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1), c.width) {
                    var i = c.width ? c.width : 512, j = c.height ? c.height : 2, k = c.border ? c.border : 0;
                    b.texImage2D(b.TEXTURE_2D, 0, h, i, j, k, h, b.UNSIGNED_BYTE, null)
                } else b.texImage2D(b.TEXTURE_2D, 0, h, b.RGBA, b.UNSIGNED_BYTE, a.value.baseTexture.source);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, d), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, e), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, f), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, g)
            }
            b.uniform1i(a.uniformLocation, this.textureCount), a._init = !0, this.textureCount++
        }
    }, e.PixiShader.prototype.syncUniforms = function () {
        this.textureCount = 1;
        var a, b = this.gl;
        for (var c in this.uniforms) a = this.uniforms[c], 1 === a.glValueLength ? a.glMatrix === !0 ? a.glFunc.call(b, a.uniformLocation, a.transpose, a.value) : a.glFunc.call(b, a.uniformLocation, a.value) : 2 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y) : 3 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y, a.value.z) : 4 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y, a.value.z, a.value.w) : "sampler2D" === a.type && (a._init ? (b.activeTexture(b["TEXTURE" + this.textureCount]), b.bindTexture(b.TEXTURE_2D, a.value.baseTexture._glTextures[b.id] || e.createWebGLTexture(a.value.baseTexture, b)), b.uniform1i(a.uniformLocation, this.textureCount), this.textureCount++) : this.initSampler2D(a))
    }, e.PixiShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec2 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;", "   vColor = vec4(color * aColor.x, aColor.x);", "}"], e.StripShader = function () {
        this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));", "   gl_FragColor = gl_FragColor * alpha;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "varying vec2 vTextureCoord;", "uniform vec2 offsetVector;", "varying float vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"]
    }, e.StripShader.prototype.init = function () {
        var a = e.gl, b = e.compileProgram(a, this.vertexSrc, this.fragmentSrc);
        a.useProgram(b), this.uSampler = a.getUniformLocation(b, "uSampler"), this.projectionVector = a.getUniformLocation(b, "projectionVector"), this.offsetVector = a.getUniformLocation(b, "offsetVector"), this.colorAttribute = a.getAttribLocation(b, "aColor"), this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"), this.aTextureCoord = a.getAttribLocation(b, "aTextureCoord"), this.translationMatrix = a.getUniformLocation(b, "translationMatrix"), this.alpha = a.getUniformLocation(b, "alpha"), this.program = b
    }, e.PrimitiveShader = function (a) {
        this.gl = a, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"], this.init()
    }, e.PrimitiveShader.prototype.init = function () {
        var a = this.gl, b = e.compileProgram(a, this.vertexSrc, this.fragmentSrc);
        a.useProgram(b), this.projectionVector = a.getUniformLocation(b, "projectionVector"), this.offsetVector = a.getUniformLocation(b, "offsetVector"), this.tintColor = a.getUniformLocation(b, "tint"), this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition"), this.colorAttribute = a.getAttribLocation(b, "aColor"), this.translationMatrix = a.getUniformLocation(b, "translationMatrix"), this.alpha = a.getUniformLocation(b, "alpha"), this.program = b
    }, e.WebGLGraphics = function () {
    }, e.WebGLGraphics.renderGraphics = function (a, b) {
        var c = b.gl, d = b.projection, f = b.offset, g = b.shaderManager.primitiveShader;
        a._webGL[c.id] || (a._webGL[c.id] = {
            points: [],
            indices: [],
            lastIndex: 0,
            buffer: c.createBuffer(),
            indexBuffer: c.createBuffer()
        });
        var h = a._webGL[c.id];
        a.dirty && (a.dirty = !1, a.clearDirty && (a.clearDirty = !1, h.lastIndex = 0, h.points = [], h.indices = []), e.WebGLGraphics.updateGraphics(a, c)), b.shaderManager.activatePrimitiveShader();
        var i = e.mat3.clone(a.worldTransform);
        e.mat3.transpose(i), c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA), c.uniformMatrix3fv(g.translationMatrix, !1, i), c.uniform2f(g.projectionVector, d.x, -d.y), c.uniform2f(g.offsetVector, -f.x, -f.y), c.uniform3fv(g.tintColor, e.hex2rgb(a.tint)), c.uniform1f(g.alpha, a.worldAlpha), c.bindBuffer(c.ARRAY_BUFFER, h.buffer), c.vertexAttribPointer(g.aVertexPosition, 2, c.FLOAT, !1, 24, 0), c.vertexAttribPointer(g.colorAttribute, 4, c.FLOAT, !1, 24, 8), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, h.indexBuffer), c.drawElements(c.TRIANGLE_STRIP, h.indices.length, c.UNSIGNED_SHORT, 0), b.shaderManager.deactivatePrimitiveShader()
    }, e.WebGLGraphics.updateGraphics = function (a, b) {
        for (var c = a._webGL[b.id], d = c.lastIndex; d < a.graphicsData.length; d++) {
            var f = a.graphicsData[d];
            f.type === e.Graphics.POLY ? (f.fill && f.points.length > 3 && e.WebGLGraphics.buildPoly(f, c), f.lineWidth > 0 && e.WebGLGraphics.buildLine(f, c)) : f.type === e.Graphics.RECT ? e.WebGLGraphics.buildRectangle(f, c) : (f.type === e.Graphics.CIRC || f.type === e.Graphics.ELIP) && e.WebGLGraphics.buildCircle(f, c)
        }
        c.lastIndex = a.graphicsData.length, c.glPoints = new Float32Array(c.points), b.bindBuffer(b.ARRAY_BUFFER, c.buffer), b.bufferData(b.ARRAY_BUFFER, c.glPoints, b.STATIC_DRAW), c.glIndicies = new Uint16Array(c.indices), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c.indexBuffer), b.bufferData(b.ELEMENT_ARRAY_BUFFER, c.glIndicies, b.STATIC_DRAW)
    }, e.WebGLGraphics.buildRectangle = function (a, b) {
        var c = a.points, d = c[0], f = c[1], g = c[2], h = c[3];
        if (a.fill) {
            var i = e.hex2rgb(a.fillColor), j = a.fillAlpha, k = i[0] * j, l = i[1] * j, m = i[2] * j, n = b.points,
                o = b.indices, p = n.length / 6;
            n.push(d, f), n.push(k, l, m, j), n.push(d + g, f), n.push(k, l, m, j), n.push(d, f + h), n.push(k, l, m, j), n.push(d + g, f + h), n.push(k, l, m, j), o.push(p, p, p + 1, p + 2, p + 3, p + 3)
        }
        if (a.lineWidth) {
            var q = a.points;
            a.points = [d, f, d + g, f, d + g, f + h, d, f + h, d, f], e.WebGLGraphics.buildLine(a, b), a.points = q
        }
    }, e.WebGLGraphics.buildCircle = function (a, b) {
        var c = a.points, d = c[0], f = c[1], g = c[2], h = c[3], i = 40, j = 2 * Math.PI / i, k = 0;
        if (a.fill) {
            var l = e.hex2rgb(a.fillColor), m = a.fillAlpha, n = l[0] * m, o = l[1] * m, p = l[2] * m, q = b.points,
                r = b.indices, s = q.length / 6;
            for (r.push(s), k = 0; i + 1 > k; k++) q.push(d, f, n, o, p, m), q.push(d + Math.sin(j * k) * g, f + Math.cos(j * k) * h, n, o, p, m), r.push(s++, s++);
            r.push(s - 1)
        }
        if (a.lineWidth) {
            var t = a.points;
            for (a.points = [], k = 0; i + 1 > k; k++) a.points.push(d + Math.sin(j * k) * g, f + Math.cos(j * k) * h);
            e.WebGLGraphics.buildLine(a, b), a.points = t
        }
    }, e.WebGLGraphics.buildLine = function (a, b) {
        var c = 0, d = a.points;
        if (0 !== d.length) {
            if (a.lineWidth % 2) for (c = 0; c < d.length; c++) d[c] += .5;
            var f = new e.Point(d[0], d[1]), g = new e.Point(d[d.length - 2], d[d.length - 1]);
            if (f.x === g.x && f.y === g.y) {
                d.pop(), d.pop(), g = new e.Point(d[d.length - 2], d[d.length - 1]);
                var h = g.x + .5 * (f.x - g.x), i = g.y + .5 * (f.y - g.y);
                d.unshift(h, i), d.push(h, i)
            }
            var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G = b.points, H = b.indices,
                I = d.length / 2, J = d.length, K = G.length / 6, L = a.lineWidth / 2, M = e.hex2rgb(a.lineColor),
                N = a.lineAlpha, O = M[0] * N, P = M[1] * N, Q = M[2] * N;
            for (l = d[0], m = d[1], n = d[2], o = d[3], r = -(m - o), s = l - n, F = Math.sqrt(r * r + s * s), r /= F, s /= F, r *= L, s *= L, G.push(l - r, m - s, O, P, Q, N), G.push(l + r, m + s, O, P, Q, N), c = 1; I - 1 > c; c++) l = d[2 * (c - 1)], m = d[2 * (c - 1) + 1], n = d[2 * c], o = d[2 * c + 1], p = d[2 * (c + 1)], q = d[2 * (c + 1) + 1], r = -(m - o), s = l - n, F = Math.sqrt(r * r + s * s), r /= F, s /= F, r *= L, s *= L, t = -(o - q), u = n - p, F = Math.sqrt(t * t + u * u), t /= F, u /= F, t *= L, u *= L, x = -s + m - (-s + o), y = -r + n - (-r + l), z = (-r + l) * (-s + o) - (-r + n) * (-s + m), A = -u + q - (-u + o), B = -t + n - (-t + p), C = (-t + p) * (-u + o) - (-t + n) * (-u + q), D = x * B - A * y, Math.abs(D) < .1 ? (D += 10.1, G.push(n - r, o - s, O, P, Q, N), G.push(n + r, o + s, O, P, Q, N)) : (j = (y * C - B * z) / D, k = (A * z - x * C) / D, E = (j - n) * (j - n) + (k - o) + (k - o), E > 19600 ? (v = r - t, w = s - u, F = Math.sqrt(v * v + w * w), v /= F, w /= F, v *= L, w *= L, G.push(n - v, o - w), G.push(O, P, Q, N), G.push(n + v, o + w), G.push(O, P, Q, N), G.push(n - v, o - w), G.push(O, P, Q, N), J++) : (G.push(j, k), G.push(O, P, Q, N), G.push(n - (j - n), o - (k - o)), G.push(O, P, Q, N)));
            for (l = d[2 * (I - 2)], m = d[2 * (I - 2) + 1], n = d[2 * (I - 1)], o = d[2 * (I - 1) + 1], r = -(m - o), s = l - n, F = Math.sqrt(r * r + s * s), r /= F, s /= F, r *= L, s *= L, G.push(n - r, o - s), G.push(O, P, Q, N), G.push(n + r, o + s), G.push(O, P, Q, N), H.push(K), c = 0; J > c; c++) H.push(K++);
            H.push(K - 1)
        }
    }, e.WebGLGraphics.buildPoly = function (a, b) {
        var c = a.points;
        if (!(c.length < 6)) {
            var d = b.points, f = b.indices, g = c.length / 2, h = e.hex2rgb(a.fillColor), i = a.fillAlpha,
                j = h[0] * i, k = h[1] * i, l = h[2] * i, m = e.PolyK.Triangulate(c), n = d.length / 6, o = 0;
            for (o = 0; o < m.length; o += 3) f.push(m[o] + n), f.push(m[o] + n), f.push(m[o + 1] + n), f.push(m[o + 2] + n), f.push(m[o + 2] + n);
            for (o = 0; g > o; o++) d.push(c[2 * o], c[2 * o + 1], j, k, l, i)
        }
    }, e.glContexts = [], e.WebGLRenderer = function (a, b, c, d, f) {
        e.defaultRenderer || (e.defaultRenderer = this), this.type = e.WEBGL_RENDERER, this.transparent = !!d, this.width = a || 800, this.height = b || 600, this.view = c || document.createElement("canvas"), this.view.width = this.width, this.view.height = this.height;
        var g = this;
        this.view.addEventListener("webglcontextlost", function (a) {
            g.handleContextLost(a)
        }, !1), this.view.addEventListener("webglcontextrestored", function (a) {
            g.handleContextRestored(a)
        }, !1), this.options = {alpha: this.transparent, antialias: !!f, premultipliedAlpha: !1, stencil: !0};
        try {
            this.gl = this.view.getContext("experimental-webgl", this.options)
        } catch (h) {
            try {
                this.gl = this.view.getContext("webgl", this.options)
            } catch (i) {
                throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this)
            }
        }
        var j = this.gl;
        this.glContextId = j.id = e.WebGLRenderer.glContextId++, e.glContexts[this.glContextId] = j, e.blendModesWebGL || (e.blendModesWebGL = [], e.blendModesWebGL[e.blendModes.NORMAL] = [j.ONE, j.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.ADD] = [j.SRC_ALPHA, j.DST_ALPHA], e.blendModesWebGL[e.blendModes.MULTIPLY] = [j.DST_COLOR, j.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.SCREEN] = [j.SRC_ALPHA, j.ONE]), this.projection = new e.Point, this.projection.x = this.width / 2, this.projection.y = -this.height / 2, this.offset = new e.Point(0, 0), this.resize(this.width, this.height), this.contextLost = !1, this.shaderManager = new e.WebGLShaderManager(j), this.spriteBatch = new e.WebGLSpriteBatch(j), this.maskManager = new e.WebGLMaskManager(j), this.filterManager = new e.WebGLFilterManager(j, this.transparent), this.renderSession = {}, this.renderSession.gl = this.gl, this.renderSession.drawCount = 0, this.renderSession.shaderManager = this.shaderManager, this.renderSession.maskManager = this.maskManager, this.renderSession.filterManager = this.filterManager, this.renderSession.spriteBatch = this.spriteBatch, j.useProgram(this.shaderManager.defaultShader.program), j.disable(j.DEPTH_TEST), j.disable(j.CULL_FACE), j.enable(j.BLEND), j.colorMask(!0, !0, !0, this.transparent)
    }, e.WebGLRenderer.prototype.constructor = e.WebGLRenderer, e.WebGLRenderer.prototype.render = function (a) {
        if (!this.contextLost) {
            this.__stage !== a && (this.__stage = a), e.WebGLRenderer.updateTextures(), a.updateTransform();
            var b = this.gl;
            b.colorMask(!0, !0, !0, this.transparent), b.viewport(0, 0, this.width, this.height), b.bindFramebuffer(b.FRAMEBUFFER, null), b.clearColor(a.backgroundColorSplit[0], a.backgroundColorSplit[1], a.backgroundColorSplit[2], !this.transparent), b.clear(b.COLOR_BUFFER_BIT), this.renderDisplayObject(a, this.projection), a.interactive && (a._interactiveEventsAdded || (a._interactiveEventsAdded = !0, a.interactionManager.setTarget(this)))
        }
    }, e.WebGLRenderer.prototype.renderDisplayObject = function (a, b) {
        this.renderSession.drawCount = 0, this.renderSession.currentBlendMode = 9999, this.renderSession.projection = b, this.renderSession.offset = this.offset, this.spriteBatch.begin(this.renderSession), this.filterManager.begin(this.renderSession, null), a._renderWebGL(this.renderSession), this.spriteBatch.end()
    }, e.WebGLRenderer.updateTextures = function () {
        var a = 0;
        for (a = 0; a < e.Texture.frameUpdates.length; a++) e.WebGLRenderer.updateTextureFrame(e.Texture.frameUpdates[a]);
        for (a = 0; a < e.texturesToDestroy.length; a++) e.WebGLRenderer.destroyTexture(e.texturesToDestroy[a]);
        e.texturesToUpdate.length = 0, e.texturesToDestroy.length = 0, e.Texture.frameUpdates.length = 0
    }, e.WebGLRenderer.destroyTexture = function (a) {
        for (var b = a._glTextures.length - 1; b >= 0; b--) {
            var c = a._glTextures[b], d = e.glContexts[b];
            d && c && d.deleteTexture(c)
        }
        a._glTextures.length = 0
    }, e.WebGLRenderer.updateTextureFrame = function (a) {
        a.updateFrame = !1, a._updateWebGLuvs()
    }, e.WebGLRenderer.prototype.resize = function (a, b) {
        this.width = a, this.height = b, this.view.width = a, this.view.height = b, this.gl.viewport(0, 0, this.width, this.height), this.projection.x = this.width / 2, this.projection.y = -this.height / 2
    }, e.createWebGLTexture = function (a, b) {
        return a.hasLoaded && (a._glTextures[b.id] = b.createTexture(), b.bindTexture(b.TEXTURE_2D, a._glTextures[b.id]), b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.source), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a.scaleMode === e.BaseTexture.SCALE_MODE.LINEAR ? b.LINEAR : b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.scaleMode === e.BaseTexture.SCALE_MODE.LINEAR ? b.LINEAR : b.NEAREST), a._powerOf2 ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.REPEAT), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.REPEAT)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE)), b.bindTexture(b.TEXTURE_2D, null)), a._glTextures[b.id]
    }, e.updateWebGLTexture = function (a, b) {
        a._glTextures[b.id] && (b.bindTexture(b.TEXTURE_2D, a._glTextures[b.id]), b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.source), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a.scaleMode === e.BaseTexture.SCALE_MODE.LINEAR ? b.LINEAR : b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.scaleMode === e.BaseTexture.SCALE_MODE.LINEAR ? b.LINEAR : b.NEAREST), a._powerOf2 ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.REPEAT), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.REPEAT)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE)), b.bindTexture(b.TEXTURE_2D, null))
    }, e.WebGLRenderer.prototype.handleContextLost = function (a) {
        a.preventDefault(), this.contextLost = !0
    }, e.WebGLRenderer.prototype.handleContextRestored = function () {
        try {
            this.gl = this.view.getContext("experimental-webgl", this.options)
        } catch (a) {
            try {
                this.gl = this.view.getContext("webgl", this.options)
            } catch (b) {
                throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this)
            }
        }
        var c = this.gl;
        c.id = e.WebGLRenderer.glContextId++, this.shaderManager.setContext(c), this.spriteBatch.setContext(c), this.maskManager.setContext(c), this.filterManager.setContext(c), this.renderSession.gl = this.gl, c.disable(c.DEPTH_TEST), c.disable(c.CULL_FACE), c.enable(c.BLEND), c.colorMask(!0, !0, !0, this.transparent), this.gl.viewport(0, 0, this.width, this.height);
        for (var d in e.TextureCache) {
            var f = e.TextureCache[d].baseTexture;
            f._glTextures = []
        }
        this.contextLost = !1
    }, e.WebGLRenderer.glContextId = 0, e.WebGLMaskManager = function (a) {
        this.maskStack = [], this.maskPosition = 0, this.setContext(a)
    }, e.WebGLMaskManager.prototype.setContext = function (a) {
        this.gl = a
    }, e.WebGLMaskManager.prototype.pushMask = function (a, b) {
        var c = this.gl;
        0 === this.maskStack.length && (c.enable(c.STENCIL_TEST), c.stencilFunc(c.ALWAYS, 1, 1)), this.maskStack.push(a), c.colorMask(!1, !1, !1, !0), c.stencilOp(c.KEEP, c.KEEP, c.INCR), e.WebGLGraphics.renderGraphics(a, b), c.colorMask(!0, !0, !0, !0), c.stencilFunc(c.NOTEQUAL, 0, this.maskStack.length), c.stencilOp(c.KEEP, c.KEEP, c.KEEP)
    }, e.WebGLMaskManager.prototype.popMask = function (a) {
        var b = this.gl, c = this.maskStack.pop();
        c && (b.colorMask(!1, !1, !1, !1), b.stencilOp(b.KEEP, b.KEEP, b.DECR), e.WebGLGraphics.renderGraphics(c, a), b.colorMask(!0, !0, !0, !0), b.stencilFunc(b.NOTEQUAL, 0, this.maskStack.length), b.stencilOp(b.KEEP, b.KEEP, b.KEEP)), 0 === this.maskStack.length && b.disable(b.STENCIL_TEST)
    }, e.WebGLShaderManager = function (a) {
        this.setContext(a)
    }, e.WebGLShaderManager.prototype.setContext = function (a) {
        this.gl = a, this.primitiveShader = new e.PrimitiveShader(a), this.defaultShader = new e.PixiShader(a);
        var b = this.defaultShader.program;
        a.useProgram(b), a.enableVertexAttribArray(this.defaultShader.aVertexPosition), a.enableVertexAttribArray(this.defaultShader.colorAttribute), a.enableVertexAttribArray(this.defaultShader.aTextureCoord)
    }, e.WebGLShaderManager.prototype.activatePrimitiveShader = function () {
        var a = this.gl;
        a.useProgram(this.primitiveShader.program), a.disableVertexAttribArray(this.defaultShader.aVertexPosition), a.disableVertexAttribArray(this.defaultShader.colorAttribute), a.disableVertexAttribArray(this.defaultShader.aTextureCoord), a.enableVertexAttribArray(this.primitiveShader.aVertexPosition), a.enableVertexAttribArray(this.primitiveShader.colorAttribute)
    }, e.WebGLShaderManager.prototype.deactivatePrimitiveShader = function () {
        var a = this.gl;
        a.useProgram(this.defaultShader.program), a.disableVertexAttribArray(this.primitiveShader.aVertexPosition), a.disableVertexAttribArray(this.primitiveShader.colorAttribute), a.enableVertexAttribArray(this.defaultShader.aVertexPosition), a.enableVertexAttribArray(this.defaultShader.colorAttribute), a.enableVertexAttribArray(this.defaultShader.aTextureCoord)
    }, e.WebGLSpriteBatch = function (a) {
        this.size = 2e3, this.vertSize = 6;
        var b = 4 * this.size * this.vertSize, c = 6 * this.size;
        this.vertices = new Float32Array(b), this.indices = new Uint16Array(c), this.lastIndexCount = 0;
        for (var d = 0, e = 0; c > d; d += 6, e += 4) this.indices[d + 0] = e + 0, this.indices[d + 1] = e + 1, this.indices[d + 2] = e + 2, this.indices[d + 3] = e + 0, this.indices[d + 4] = e + 2, this.indices[d + 5] = e + 3;
        this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.setContext(a)
    }, e.WebGLSpriteBatch.prototype.setContext = function (a) {
        this.gl = a, this.vertexBuffer = a.createBuffer(), this.indexBuffer = a.createBuffer(), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW), this.currentBlendMode = 99999
    }, e.WebGLSpriteBatch.prototype.begin = function (a) {
        this.renderSession = a, this.shader = this.renderSession.shaderManager.defaultShader, this.start()
    }, e.WebGLSpriteBatch.prototype.end = function () {
        this.flush()
    }, e.WebGLSpriteBatch.prototype.render = function (a) {
        (a.texture.baseTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size) && (this.flush(), this.currentBaseTexture = a.texture.baseTexture), a.blendMode !== this.currentBlendMode && this.setBlendMode(a.blendMode);
        var b = a._uvs || a.texture._uvs;
        if (b) {
            var c, d, e, f, g = a.worldAlpha, h = a.tint, i = this.vertices, j = a.texture.frame.width,
                k = a.texture.frame.height, l = a.anchor.x, m = a.anchor.y;
            if (a.texture.trimmed) {
                var n = a.texture.trim;
                d = n.x - l * n.realWidth, c = d + j, f = n.y - m * n.realHeight, e = f + k
            } else c = j * (1 - l), d = j * -l, e = k * (1 - m), f = k * -m;
            var o = 4 * this.currentBatchSize * this.vertSize, p = a.worldTransform, q = p[0], r = p[3], s = p[1],
                t = p[4], u = p[2], v = p[5];
            i[o++] = q * d + s * f + u, i[o++] = t * f + r * d + v, i[o++] = b[0], i[o++] = b[1], i[o++] = g, i[o++] = h, i[o++] = q * c + s * f + u, i[o++] = t * f + r * c + v, i[o++] = b[2], i[o++] = b[3], i[o++] = g, i[o++] = h, i[o++] = q * c + s * e + u, i[o++] = t * e + r * c + v, i[o++] = b[4], i[o++] = b[5], i[o++] = g, i[o++] = h, i[o++] = q * d + s * e + u, i[o++] = t * e + r * d + v, i[o++] = b[6], i[o++] = b[7], i[o++] = g, i[o++] = h, this.currentBatchSize++
        }
    }, e.WebGLSpriteBatch.prototype.renderTilingSprite = function (a) {
        var b = a.tilingTexture;
        (b.baseTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size) && (this.flush(), this.currentBaseTexture = b.baseTexture), a.blendMode !== this.currentBlendMode && this.setBlendMode(a.blendMode), a._uvs || (a._uvs = new Float32Array(8));
        var c = a._uvs, d = a.tilePosition.x / b.baseTexture.width, e = a.tilePosition.y / b.baseTexture.height,
            f = a.width / b.baseTexture.width / (a.tileScale.x * a.tileScaleOffset.x),
            g = a.height / b.baseTexture.height / (a.tileScale.y * a.tileScaleOffset.y);
        c[0] = 0 - d, c[1] = 0 - e, c[2] = 1 * f - d, c[3] = 0 - e, c[4] = 1 * f - d, c[5] = 1 * g - e, c[6] = 0 - d, c[7] = 1 * g - e;
        var h = a.worldAlpha, i = a.tint, j = this.vertices, k = a.width, l = a.height, m = a.anchor.x, n = a.anchor.y,
            o = k * (1 - m), p = k * -m, q = l * (1 - n), r = l * -n, s = 4 * this.currentBatchSize * this.vertSize,
            t = a.worldTransform, u = t[0], v = t[3], w = t[1], x = t[4], y = t[2], z = t[5];
        j[s++] = u * p + w * r + y, j[s++] = x * r + v * p + z, j[s++] = c[0], j[s++] = c[1], j[s++] = h, j[s++] = i, j[s++] = u * o + w * r + y, j[s++] = x * r + v * o + z, j[s++] = c[2], j[s++] = c[3], j[s++] = h, j[s++] = i, j[s++] = u * o + w * q + y, j[s++] = x * q + v * o + z, j[s++] = c[4], j[s++] = c[5], j[s++] = h, j[s++] = i, j[s++] = u * p + w * q + y, j[s++] = x * q + v * p + z, j[s++] = c[6], j[s++] = c[7], j[s++] = h, j[s++] = i, this.currentBatchSize++
    }, e.WebGLSpriteBatch.prototype.flush = function () {
        if (0 !== this.currentBatchSize) {
            var a = this.gl;
            a.bindTexture(a.TEXTURE_2D, this.currentBaseTexture._glTextures[a.id] || e.createWebGLTexture(this.currentBaseTexture, a));
            var b = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
            a.bufferSubData(a.ARRAY_BUFFER, 0, b), a.drawElements(a.TRIANGLES, 6 * this.currentBatchSize, a.UNSIGNED_SHORT, 0), this.currentBatchSize = 0, this.renderSession.drawCount++
        }
    }, e.WebGLSpriteBatch.prototype.stop = function () {
        this.flush()
    }, e.WebGLSpriteBatch.prototype.start = function () {
        var a = this.gl;
        a.activeTexture(a.TEXTURE0), a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var b = this.renderSession.projection;
        a.uniform2f(this.shader.projectionVector, b.x, b.y);
        var c = 4 * this.vertSize;
        a.vertexAttribPointer(this.shader.aVertexPosition, 2, a.FLOAT, !1, c, 0), a.vertexAttribPointer(this.shader.aTextureCoord, 2, a.FLOAT, !1, c, 8), a.vertexAttribPointer(this.shader.colorAttribute, 2, a.FLOAT, !1, c, 16), this.currentBlendMode !== e.blendModes.NORMAL && this.setBlendMode(e.blendModes.NORMAL)
    }, e.WebGLSpriteBatch.prototype.setBlendMode = function (a) {
        this.flush(), this.currentBlendMode = a;
        var b = e.blendModesWebGL[this.currentBlendMode];
        this.gl.blendFunc(b[0], b[1])
    }, e.WebGLFilterManager = function (a, b) {
        this.transparent = b, this.filterStack = [], this.offsetX = 0, this.offsetY = 0, this.setContext(a)
    }, e.WebGLFilterManager.prototype.setContext = function (a) {
        this.gl = a, this.texturePool = [], this.initShaderBuffers()
    }, e.WebGLFilterManager.prototype.begin = function (a, b) {
        this.renderSession = a, this.defaultShader = a.shaderManager.defaultShader;
        var c = this.renderSession.projection;
        this.width = 2 * c.x, this.height = 2 * -c.y, this.buffer = b
    }, e.WebGLFilterManager.prototype.pushFilter = function (a) {
        var b = this.gl, c = this.renderSession.projection, d = this.renderSession.offset;
        this.filterStack.push(a);
        var f = a.filterPasses[0];
        this.offsetX += a.target.filterArea.x, this.offsetY += a.target.filterArea.y;
        var g = this.texturePool.pop();
        g ? g.resize(this.width, this.height) : g = new e.FilterTexture(this.gl, this.width, this.height), b.bindTexture(b.TEXTURE_2D, g.texture), a.target.filterArea = a.target.getBounds();
        var h = a.target.filterArea, i = f.padding;
        h.x -= i, h.y -= i, h.width += 2 * i, h.height += 2 * i, h.x < 0 && (h.x = 0), h.width > this.width && (h.width = this.width), h.y < 0 && (h.y = 0), h.height > this.height && (h.height = this.height), b.bindFramebuffer(b.FRAMEBUFFER, g.frameBuffer), b.viewport(0, 0, h.width, h.height), c.x = h.width / 2, c.y = -h.height / 2, d.x = -h.x, d.y = -h.y, b.uniform2f(this.defaultShader.projectionVector, h.width / 2, -h.height / 2), b.uniform2f(this.defaultShader.offsetVector, -h.x, -h.y), b.colorMask(!0, !0, !0, !0), b.clearColor(0, 0, 0, 0), b.clear(b.COLOR_BUFFER_BIT), a._glFilterTexture = g
    }, e.WebGLFilterManager.prototype.popFilter = function () {
        var a = this.gl, b = this.filterStack.pop(), c = b.target.filterArea, d = b._glFilterTexture,
            f = this.renderSession.projection, g = this.renderSession.offset;
        if (b.filterPasses.length > 1) {
            a.viewport(0, 0, c.width, c.height), a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = 0, this.vertexArray[1] = c.height, this.vertexArray[2] = c.width, this.vertexArray[3] = c.height, this.vertexArray[4] = 0, this.vertexArray[5] = 0, this.vertexArray[6] = c.width, this.vertexArray[7] = 0, a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertexArray), a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = c.width / this.width, this.uvArray[5] = c.height / this.height, this.uvArray[6] = c.width / this.width, this.uvArray[7] = c.height / this.height, a.bufferSubData(a.ARRAY_BUFFER, 0, this.uvArray);
            var h = d, i = this.texturePool.pop();
            i || (i = new e.FilterTexture(this.gl, this.width, this.height)), a.bindFramebuffer(a.FRAMEBUFFER, i.frameBuffer), a.clear(a.COLOR_BUFFER_BIT), a.disable(a.BLEND);
            for (var j = 0; j < b.filterPasses.length - 1; j++) {
                var k = b.filterPasses[j];
                a.bindFramebuffer(a.FRAMEBUFFER, i.frameBuffer), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, h.texture), this.applyFilterPass(k, c, c.width, c.height);
                var l = h;
                h = i, i = l
            }
            a.enable(a.BLEND), d = h, this.texturePool.push(i)
        }
        var m = b.filterPasses[b.filterPasses.length - 1];
        this.offsetX -= c.x, this.offsetY -= c.y;
        var n = this.width, o = this.height, p = 0, q = 0, r = this.buffer;
        if (0 === this.filterStack.length) a.colorMask(!0, !0, !0, this.transparent); else {
            var s = this.filterStack[this.filterStack.length - 1];
            c = s.target.filterArea, n = c.width, o = c.height, p = c.x, q = c.y, r = s._glFilterTexture.frameBuffer
        }
        f.x = n / 2, f.y = -o / 2, g.x = p, g.y = q, c = b.target.filterArea;
        var t = c.x - p, u = c.y - q;
        a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = t, this.vertexArray[1] = u + c.height, this.vertexArray[2] = t + c.width, this.vertexArray[3] = u + c.height, this.vertexArray[4] = t, this.vertexArray[5] = u, this.vertexArray[6] = t + c.width, this.vertexArray[7] = u, a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertexArray), a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = c.width / this.width, this.uvArray[5] = c.height / this.height, this.uvArray[6] = c.width / this.width, this.uvArray[7] = c.height / this.height, a.bufferSubData(a.ARRAY_BUFFER, 0, this.uvArray), a.viewport(0, 0, n, o), a.bindFramebuffer(a.FRAMEBUFFER, r), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, d.texture), this.applyFilterPass(m, c, n, o), a.useProgram(this.defaultShader.program), a.uniform2f(this.defaultShader.projectionVector, n / 2, -o / 2), a.uniform2f(this.defaultShader.offsetVector, -p, -q), this.texturePool.push(d), b._glFilterTexture = null
    }, e.WebGLFilterManager.prototype.applyFilterPass = function (a, b, c, d) {
        var f = this.gl, g = a.shaders[f.id];
        g || (g = new e.PixiShader(f), g.fragmentSrc = a.fragmentSrc, g.uniforms = a.uniforms, g.init(), a.shaders[f.id] = g), f.useProgram(g.program), f.uniform2f(g.projectionVector, c / 2, -d / 2), f.uniform2f(g.offsetVector, 0, 0), a.uniforms.dimensions && (a.uniforms.dimensions.value[0] = this.width, a.uniforms.dimensions.value[1] = this.height, a.uniforms.dimensions.value[2] = this.vertexArray[0], a.uniforms.dimensions.value[3] = this.vertexArray[5]), g.syncUniforms(), f.bindBuffer(f.ARRAY_BUFFER, this.vertexBuffer), f.vertexAttribPointer(g.aVertexPosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this.uvBuffer), f.vertexAttribPointer(g.aTextureCoord, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this.colorBuffer), f.vertexAttribPointer(g.colorAttribute, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this.indexBuffer), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), this.renderSession.drawCount++
    }, e.WebGLFilterManager.prototype.initShaderBuffers = function () {
        var a = this.gl;
        this.vertexBuffer = a.createBuffer(), this.uvBuffer = a.createBuffer(), this.colorBuffer = a.createBuffer(), this.indexBuffer = a.createBuffer(), this.vertexArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bufferData(a.ARRAY_BUFFER, this.vertexArray, a.STATIC_DRAW), this.uvArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer), a.bufferData(a.ARRAY_BUFFER, this.uvArray, a.STATIC_DRAW), this.colorArray = new Float32Array([1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215]), a.bindBuffer(a.ARRAY_BUFFER, this.colorBuffer), a.bufferData(a.ARRAY_BUFFER, this.colorArray, a.STATIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), a.STATIC_DRAW)
    }, e.FilterTexture = function (a, b, c) {
        this.gl = a, this.frameBuffer = a.createFramebuffer(), this.texture = a.createTexture(), a.bindTexture(a.TEXTURE_2D, this.texture), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer), a.bindFramebuffer(a.FRAMEBUFFER, this.frameBuffer), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.texture, 0), this.resize(b, c)
    }, e.FilterTexture.prototype.clear = function () {
        var a = this.gl;
        a.clearColor(0, 0, 0, 0), a.clear(a.COLOR_BUFFER_BIT)
    }, e.FilterTexture.prototype.resize = function (a, b) {
        if (this.width !== a || this.height !== b) {
            this.width = a, this.height = b;
            var c = this.gl;
            c.bindTexture(c.TEXTURE_2D, this.texture), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, a, b, 0, c.RGBA, c.UNSIGNED_BYTE, null)
        }
    }, e.CanvasMaskManager = function () {
    }, e.CanvasMaskManager.prototype.pushMask = function (a, b) {
        b.save();
        var c = a.alpha, d = a.worldTransform;
        b.setTransform(d[0], d[3], d[1], d[4], d[2], d[5]), e.CanvasGraphics.renderGraphicsMask(a, b), b.clip(), a.worldAlpha = c
    }, e.CanvasMaskManager.prototype.popMask = function (a) {
        a.restore()
    }, e.CanvasTinter = function () {
    }, e.CanvasTinter.getTintedTexture = function (a, b) {
        var c = a.texture;
        b = e.CanvasTinter.roundColor(b);
        var d = "#" + ("00000" + (0 | b).toString(16)).substr(-6);
        if (c.tintCache = c.tintCache || {}, c.tintCache[d]) return c.tintCache[d];
        var f = e.CanvasTinter.canvas || document.createElement("canvas");
        if (e.CanvasTinter.tintMethod(c, b, f), e.CanvasTinter.convertTintToImage) {
            var g = new Image;
            g.src = f.toDataURL(), c.tintCache[d] = g
        } else c.tintCache[d] = f, e.CanvasTinter.canvas = null;
        return f
    }, e.CanvasTinter.tintWithMultiply = function (a, b, c) {
        var d = c.getContext("2d"), e = a.frame;
        c.width = e.width, c.height = e.height, d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, e.width, e.height), d.globalCompositeOperation = "multiply", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height)
    }, e.CanvasTinter.tintWithOverlay = function (a, b, c) {
        var d = c.getContext("2d"), e = a.frame;
        c.width = e.width, c.height = e.height, d.globalCompositeOperation = "copy", d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, e.width, e.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height)
    }, e.CanvasTinter.tintWithPerPixel = function (a, b, c) {
        var d = c.getContext("2d"), f = a.frame;
        c.width = f.width, c.height = f.height, d.globalCompositeOperation = "copy", d.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height);
        for (var g = e.hex2rgb(b), h = g[0], i = g[1], j = g[2], k = d.getImageData(0, 0, f.width, f.height), l = k.data, m = 0; m < l.length; m += 4) l[m + 0] *= h, l[m + 1] *= i, l[m + 2] *= j;
        d.putImageData(k, 0, 0)
    }, e.CanvasTinter.roundColor = function (a) {
        var b = e.CanvasTinter.cacheStepsPerColorChannel, c = e.hex2rgb(a);
        return c[0] = Math.round(c[0] * b) / b, c[1] = Math.round(c[1] * b) / b, c[2] = Math.round(c[2] * b) / b, e.rgb2hex(c)
    }, e.CanvasTinter.cacheStepsPerColorChannel = 8, e.CanvasTinter.convertTintToImage = !1, e.CanvasTinter.canUseMultiply = e.canUseNewCanvasBlendModes(), e.CanvasTinter.tintMethod = e.CanvasTinter.canUseMultiply ? e.CanvasTinter.tintWithMultiply : e.CanvasTinter.tintWithPerPixel, e.CanvasRenderer = function (a, b, c, d) {
        e.defaultRenderer = e.defaultRenderer || this, this.type = e.CANVAS_RENDERER, this.transparent = d, e.blendModesCanvas || (e.blendModesCanvas = [], e.canUseNewCanvasBlendModes() ? (e.blendModesCanvas[e.blendModes.NORMAL] = "source-over", e.blendModesCanvas[e.blendModes.ADD] = "lighter", e.blendModesCanvas[e.blendModes.MULTIPLY] = "multiply", e.blendModesCanvas[e.blendModes.SCREEN] = "screen") : (e.blendModesCanvas[e.blendModes.NORMAL] = "source-over", e.blendModesCanvas[e.blendModes.ADD] = "lighter", e.blendModesCanvas[e.blendModes.MULTIPLY] = "source-over", e.blendModesCanvas[e.blendModes.SCREEN] = "source-over")), this.width = a || 800, this.height = b || 600, this.view = c || document.createElement("canvas"), this.context = this.view.getContext("2d"), this.smoothProperty = null, "imageSmoothingEnabled" in this.context ? this.smoothProperty = "imageSmoothingEnabled" : "webkitImageSmoothingEnabled" in this.context ? this.smoothProperty = "webkitImageSmoothingEnabled" : "mozImageSmoothingEnabled" in this.context ? this.smoothProperty = "mozImageSmoothingEnabled" : "oImageSmoothingEnabled" in this.context && (this.smoothProperty = "oImageSmoothingEnabled"), this.scaleMode = null, this.refresh = !0, this.view.width = this.width, this.view.height = this.height, this.count = 0, this.maskManager = new e.CanvasMaskManager, this.renderSession = {}, this.renderSession.context = this.context, this.renderSession.maskManager = this.maskManager
    }, e.CanvasRenderer.prototype.constructor = e.CanvasRenderer, e.CanvasRenderer.prototype.render = function (a) {
        e.texturesToUpdate.length = 0, e.texturesToDestroy.length = 0, e.visibleCount++, a.updateTransform(), this.view.style.backgroundColor === a.backgroundColorString || this.transparent || (this.view.style.backgroundColor = a.backgroundColorString), this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.width, this.height), this.renderDisplayObject(a), a.interactive && (a._interactiveEventsAdded || (a._interactiveEventsAdded = !0, a.interactionManager.setTarget(this))), e.Texture.frameUpdates.length > 0 && (e.Texture.frameUpdates.length = 0)
    }, e.CanvasRenderer.prototype.resize = function (a, b) {
        this.width = a, this.height = b, this.view.width = a, this.view.height = b
    }, e.CanvasRenderer.prototype.renderDisplayObject = function (a, b) {
        this.renderSession.context = b || this.context, a._renderCanvas(this.renderSession)
    }, e.CanvasRenderer.prototype.renderStripFlat = function (a) {
        var b = this.context, c = a.verticies, d = c.length / 2;
        this.count++, b.beginPath();
        for (var e = 1; d - 2 > e; e++) {
            var f = 2 * e, g = c[f], h = c[f + 2], i = c[f + 4], j = c[f + 1], k = c[f + 3], l = c[f + 5];
            b.moveTo(g, j), b.lineTo(h, k), b.lineTo(i, l)
        }
        b.fillStyle = "#FF0000", b.fill(), b.closePath()
    }, e.CanvasRenderer.prototype.renderStrip = function (a) {
        var b = this.context, c = a.verticies, d = a.uvs, e = c.length / 2;
        this.count++;
        for (var f = 1; e - 2 > f; f++) {
            var g = 2 * f, h = c[g], i = c[g + 2], j = c[g + 4], k = c[g + 1], l = c[g + 3], m = c[g + 5],
                n = d[g] * a.texture.width, o = d[g + 2] * a.texture.width, p = d[g + 4] * a.texture.width,
                q = d[g + 1] * a.texture.height, r = d[g + 3] * a.texture.height, s = d[g + 5] * a.texture.height;
            b.save(), b.beginPath(), b.moveTo(h, k), b.lineTo(i, l), b.lineTo(j, m), b.closePath(), b.clip();
            var t = n * r + q * p + o * s - r * p - q * o - n * s, u = h * r + q * j + i * s - r * j - q * i - h * s,
                v = n * i + h * p + o * j - i * p - h * o - n * j,
                w = n * r * j + q * i * p + h * o * s - h * r * p - q * o * j - n * i * s,
                x = k * r + q * m + l * s - r * m - q * l - k * s, y = n * l + k * p + o * m - l * p - k * o - n * m,
                z = n * r * m + q * l * p + k * o * s - k * r * p - q * o * m - n * l * s;
            b.transform(u / t, x / t, v / t, y / t, w / t, z / t), b.drawImage(a.texture.baseTexture.source, 0, 0), b.restore()
        }
    }, e.CanvasBuffer = function (a, b) {
        this.width = a, this.height = b, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = a, this.canvas.height = b
    }, e.CanvasBuffer.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height)
    },e.CanvasBuffer.prototype.resize = function (a, b) {
        this.width = this.canvas.width = a, this.height = this.canvas.height = b
    },e.CanvasGraphics = function () {
    },e.CanvasGraphics.renderGraphics = function (a, b) {
        for (var c = a.worldAlpha, d = "", f = 0; f < a.graphicsData.length; f++) {
            var g = a.graphicsData[f], h = g.points;
            if (b.strokeStyle = d = "#" + ("00000" + (0 | g.lineColor).toString(16)).substr(-6), b.lineWidth = g.lineWidth, g.type === e.Graphics.POLY) {
                b.beginPath(), b.moveTo(h[0], h[1]);
                for (var i = 1; i < h.length / 2; i++) b.lineTo(h[2 * i], h[2 * i + 1]);
                h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && b.closePath(), g.fill && (b.globalAlpha = g.fillAlpha * c, b.fillStyle = d = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6), b.fill()), g.lineWidth && (b.globalAlpha = g.lineAlpha * c, b.stroke())
            } else if (g.type === e.Graphics.RECT) (g.fillColor || 0 === g.fillColor) && (b.globalAlpha = g.fillAlpha * c, b.fillStyle = d = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6), b.fillRect(h[0], h[1], h[2], h[3])), g.lineWidth && (b.globalAlpha = g.lineAlpha * c, b.strokeRect(h[0], h[1], h[2], h[3])); else if (g.type === e.Graphics.CIRC) b.beginPath(), b.arc(h[0], h[1], h[2], 0, 2 * Math.PI), b.closePath(), g.fill && (b.globalAlpha = g.fillAlpha * c, b.fillStyle = d = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6), b.fill()), g.lineWidth && (b.globalAlpha = g.lineAlpha * c, b.stroke()); else if (g.type === e.Graphics.ELIP) {
                var j = g.points, k = 2 * j[2], l = 2 * j[3], m = j[0] - k / 2, n = j[1] - l / 2;
                b.beginPath();
                var o = .5522848, p = k / 2 * o, q = l / 2 * o, r = m + k, s = n + l, t = m + k / 2, u = n + l / 2;
                b.moveTo(m, u), b.bezierCurveTo(m, u - q, t - p, n, t, n), b.bezierCurveTo(t + p, n, r, u - q, r, u), b.bezierCurveTo(r, u + q, t + p, s, t, s), b.bezierCurveTo(t - p, s, m, u + q, m, u), b.closePath(), g.fill && (b.globalAlpha = g.fillAlpha * c, b.fillStyle = d = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6), b.fill()), g.lineWidth && (b.globalAlpha = g.lineAlpha * c, b.stroke())
            }
        }
    },e.CanvasGraphics.renderGraphicsMask = function (a, b) {
        var c = a.graphicsData.length;
        if (0 !== c) {
            c > 1 && (c = 1, window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));
            for (var d = 0; 1 > d; d++) {
                var f = a.graphicsData[d], g = f.points;
                if (f.type === e.Graphics.POLY) {
                    b.beginPath(), b.moveTo(g[0], g[1]);
                    for (var h = 1; h < g.length / 2; h++) b.lineTo(g[2 * h], g[2 * h + 1]);
                    g[0] === g[g.length - 2] && g[1] === g[g.length - 1] && b.closePath()
                } else if (f.type === e.Graphics.RECT) b.beginPath(), b.rect(g[0], g[1], g[2], g[3]), b.closePath(); else if (f.type === e.Graphics.CIRC) b.beginPath(), b.arc(g[0], g[1], g[2], 0, 2 * Math.PI), b.closePath(); else if (f.type === e.Graphics.ELIP) {
                    var i = f.points, j = 2 * i[2], k = 2 * i[3], l = i[0] - j / 2, m = i[1] - k / 2;
                    b.beginPath();
                    var n = .5522848, o = j / 2 * n, p = k / 2 * n, q = l + j, r = m + k, s = l + j / 2, t = m + k / 2;
                    b.moveTo(l, t), b.bezierCurveTo(l, t - p, s - o, m, s, m), b.bezierCurveTo(s + o, m, q, t - p, q, t), b.bezierCurveTo(q, t + p, s + o, r, s, r), b.bezierCurveTo(s - o, r, l, t + p, l, t), b.closePath()
                }
            }
        }
    },e.Graphics = function () {
        e.DisplayObjectContainer.call(this), this.renderable = !0, this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = "black", this.graphicsData = [], this.tint = 16777215, this.blendMode = e.blendModes.NORMAL, this.currentPath = {points: []}, this._webGL = [], this.isMask = !1, this.bounds = null, this.boundsPadding = 10
    },e.Graphics.prototype = Object.create(e.DisplayObjectContainer.prototype),e.Graphics.prototype.constructor = e.Graphics,Object.defineProperty(e.Graphics.prototype, "cacheAsBitmap", {
        get: function () {
            return this._cacheAsBitmap
        }, set: function (a) {
            this._cacheAsBitmap = a, this._cacheAsBitmap ? this._generateCachedSprite() : (this.destroyCachedSprite(), this.dirty = !0)
        }
    }),e.Graphics.prototype.lineStyle = function (a, b, c) {
        this.currentPath.points.length || this.graphicsData.pop(), this.lineWidth = a || 0, this.lineColor = b || 0, this.lineAlpha = arguments.length < 3 ? 1 : c, this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: e.Graphics.POLY
        }, this.graphicsData.push(this.currentPath)
    },e.Graphics.prototype.moveTo = function (a, b) {
        this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: e.Graphics.POLY
        }, this.currentPath.points.push(a, b), this.graphicsData.push(this.currentPath)
    },e.Graphics.prototype.lineTo = function (a, b) {
        this.currentPath.points.push(a, b), this.dirty = !0
    },e.Graphics.prototype.beginFill = function (a, b) {
        this.filling = !0, this.fillColor = a || 0, this.fillAlpha = arguments.length < 2 ? 1 : b
    },e.Graphics.prototype.endFill = function () {
        this.filling = !1, this.fillColor = null, this.fillAlpha = 1
    },e.Graphics.prototype.drawRect = function (a, b, c, d) {
        this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [a, b, c, d],
            type: e.Graphics.RECT
        }, this.graphicsData.push(this.currentPath), this.dirty = !0
    },e.Graphics.prototype.drawCircle = function (a, b, c) {
        this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [a, b, c, c],
            type: e.Graphics.CIRC
        }, this.graphicsData.push(this.currentPath), this.dirty = !0
    },e.Graphics.prototype.drawEllipse = function (a, b, c, d) {
        this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [a, b, c, d],
            type: e.Graphics.ELIP
        }, this.graphicsData.push(this.currentPath), this.dirty = !0
    },e.Graphics.prototype.clear = function () {
        this.lineWidth = 0, this.filling = !1, this.dirty = !0, this.clearDirty = !0, this.graphicsData = [], this.bounds = null
    },e.Graphics.prototype.generateTexture = function () {
        var a = this.getBounds(), b = new e.CanvasBuffer(a.width, a.height), c = e.Texture.fromCanvas(b.canvas);
        return b.context.translate(-a.x, -a.y), e.CanvasGraphics.renderGraphics(this, b.context), c
    },e.Graphics.prototype._renderWebGL = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
            if (this._cacheAsBitmap) return this.dirty && (this._generateCachedSprite(), e.updateWebGLTexture(this._cachedSprite.texture.baseTexture, a.gl), this.dirty = !1), e.Sprite.prototype._renderWebGL.call(this._cachedSprite, a), void 0;
            if (a.spriteBatch.stop(), this._mask && a.maskManager.pushMask(this.mask, a), this._filters && a.filterManager.pushFilter(this._filterBlock), this.blendMode !== a.spriteBatch.currentBlendMode) {
                this.spriteBatch.currentBlendMode = this.blendMode;
                var b = e.blendModesWebGL[a.spriteBatch.currentBlendMode];
                this.spriteBatch.gl.blendFunc(b[0], b[1])
            }
            e.WebGLGraphics.renderGraphics(this, a), this._filters && a.filterManager.popFilter(), this._mask && a.maskManager.popMask(a), a.drawCount++, a.spriteBatch.start()
        }
    },e.Graphics.prototype._renderCanvas = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
            var b = a.context, c = this.worldTransform;
            this.blendMode !== a.currentBlendMode && (a.currentBlendMode = this.blendMode, b.globalCompositeOperation = e.blendModesCanvas[a.currentBlendMode]), b.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]), e.CanvasGraphics.renderGraphics(this, b)
        }
    },e.Graphics.prototype.getBounds = function () {
        this.bounds || this.updateBounds();
        var a = this.bounds.x, b = this.bounds.width + this.bounds.x, c = this.bounds.y,
            d = this.bounds.height + this.bounds.y, e = this.worldTransform, f = e[0], g = e[3], h = e[1], i = e[4],
            j = e[2], k = e[5], l = f * b + h * d + j, m = i * d + g * b + k, n = f * a + h * d + j,
            o = i * d + g * a + k, p = f * a + h * c + j, q = i * c + g * a + k, r = f * b + h * c + j,
            s = i * c + g * b + k, t = -1 / 0, u = -1 / 0, v = 1 / 0, w = 1 / 0;
        v = v > l ? l : v, v = v > n ? n : v, v = v > p ? p : v, v = v > r ? r : v, w = w > m ? m : w, w = w > o ? o : w, w = w > q ? q : w, w = w > s ? s : w, t = l > t ? l : t, t = n > t ? n : t, t = p > t ? p : t, t = r > t ? r : t, u = m > u ? m : u, u = o > u ? o : u, u = q > u ? q : u, u = s > u ? s : u;
        var x = this._bounds;
        return x.x = v, x.width = t - v, x.y = w, x.height = u - w, x
    },e.Graphics.prototype.updateBounds = function () {
        for (var a, b, c, d = 1 / 0, f = -1 / 0, g = 1 / 0, h = -1 / 0, i = 0; i < this.graphicsData.length; i++) {
            var j = this.graphicsData[i], k = j.type, l = j.lineWidth;
            if (a = j.points, k === e.Graphics.RECT) {
                b = a.x - l / 2, c = a.y - l / 2;
                var m = a.width + l, n = a.height + l;
                d = d > b ? b : d, f = b + m > f ? b + m : f, g = g > c ? b : g, h = c + n > h ? c + n : h
            } else if (k === e.Graphics.CIRC || k === e.Graphics.ELIP) {
                b = a.x, c = a.y;
                var o = a.radius + l / 2;
                d = d > b - o ? b - o : d, f = b + o > f ? b + o : f, g = g > c - o ? c - o : g, h = c + o > h ? c + o : h
            } else for (var p = 0; p < a.length; p += 2) b = a[p], c = a[p + 1], d = d > b - l ? b - l : d, f = b + l > f ? b + l : f, g = g > c - l ? c - l : g, h = c + l > h ? c + l : h
        }
        var q = this.boundsPadding;
        this.bounds = new e.Rectangle(d - q, g - q, f - d + 2 * q, h - g + 2 * q)
    },e.Graphics.prototype._generateCachedSprite = function () {
        var a = this.getBounds();
        if (this._cachedSprite) this._cachedSprite.buffer.resize(a.width, a.height); else {
            var b = new e.CanvasBuffer(a.width, a.height), c = e.Texture.fromCanvas(b.canvas);
            this._cachedSprite = new e.Sprite(c), this._cachedSprite.buffer = b, this._cachedSprite.worldTransform = this.worldTransform
        }
        this._cachedSprite.anchor.x = -(a.x / a.width), this._cachedSprite.anchor.y = -(a.y / a.height), this._cachedSprite.buffer.context.translate(-a.x, -a.y), e.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context)
    },e.Graphics.prototype.destroyCachedSprite = function () {
        this._cachedSprite.texture.destroy(!0), this._cachedSprite = null
    },e.Graphics.POLY = 0,e.Graphics.RECT = 1,e.Graphics.CIRC = 2,e.Graphics.ELIP = 3,e.Strip = function (a, b, c) {
        e.DisplayObjectContainer.call(this), this.texture = a, this.blendMode = e.blendModes.NORMAL;
        try {
            this.uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1]), this.verticies = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]), this.colors = new Float32Array([1, 1, 1, 1]), this.indices = new Uint16Array([0, 1, 2, 3])
        } catch (d) {
            this.uvs = [0, 1, 1, 1, 1, 0, 0, 1], this.verticies = [0, 0, 0, 0, 0, 0, 0, 0, 0], this.colors = [1, 1, 1, 1], this.indices = [0, 1, 2, 3]
        }
        this.width = b, this.height = c, a.baseTexture.hasLoaded ? (this.width = this.texture.frame.width, this.height = this.texture.frame.height, this.updateFrame = !0) : (this.onTextureUpdateBind = this.onTextureUpdate.bind(this), this.texture.addEventListener("update", this.onTextureUpdateBind)), this.renderable = !0
    },e.Strip.prototype = Object.create(e.DisplayObjectContainer.prototype),e.Strip.prototype.constructor = e.Strip,e.Strip.prototype.setTexture = function (a) {
        this.texture = a, this.width = a.frame.width, this.height = a.frame.height, this.updateFrame = !0
    },e.Strip.prototype.onTextureUpdate = function () {
        this.updateFrame = !0
    },e.Rope = function (a, b) {
        e.Strip.call(this, a), this.points = b;
        try {
            this.verticies = new Float32Array(4 * b.length), this.uvs = new Float32Array(4 * b.length), this.colors = new Float32Array(2 * b.length), this.indices = new Uint16Array(2 * b.length)
        } catch (c) {
            this.verticies = new Array(4 * b.length), this.uvs = new Array(4 * b.length), this.colors = new Array(2 * b.length), this.indices = new Array(2 * b.length)
        }
        this.refresh()
    },e.Rope.prototype = Object.create(e.Strip.prototype),e.Rope.prototype.constructor = e.Rope,e.Rope.prototype.refresh = function () {
        var a = this.points;
        if (!(a.length < 1)) {
            var b = this.uvs, c = a[0], d = this.indices, e = this.colors;
            this.count -= .2, b[0] = 0, b[1] = 1, b[2] = 0, b[3] = 1, e[0] = 1, e[1] = 1, d[0] = 0, d[1] = 1;
            for (var f, g, h, i = a.length, j = 1; i > j; j++) f = a[j], g = 4 * j, h = j / (i - 1), j % 2 ? (b[g] = h, b[g + 1] = 0, b[g + 2] = h, b[g + 3] = 1) : (b[g] = h, b[g + 1] = 0, b[g + 2] = h, b[g + 3] = 1), g = 2 * j, e[g] = 1, e[g + 1] = 1, g = 2 * j, d[g] = g, d[g + 1] = g + 1, c = f
        }
    },e.Rope.prototype.updateTransform = function () {
        var a = this.points;
        if (!(a.length < 1)) {
            var b, c = a[0], d = {x: 0, y: 0};
            this.count -= .2;
            var f = this.verticies;
            f[0] = c.x + d.x, f[1] = c.y + d.y, f[2] = c.x - d.x, f[3] = c.y - d.y;
            for (var g, h, i, j, k, l = a.length, m = 1; l > m; m++) g = a[m], h = 4 * m, b = m < a.length - 1 ? a[m + 1] : g, d.y = -(b.x - c.x), d.x = b.y - c.y, i = 10 * (1 - m / (l - 1)), i > 1 && (i = 1), j = Math.sqrt(d.x * d.x + d.y * d.y), k = this.texture.height / 2, d.x /= j, d.y /= j, d.x *= k, d.y *= k, f[h] = g.x + d.x, f[h + 1] = g.y + d.y, f[h + 2] = g.x - d.x, f[h + 3] = g.y - d.y, c = g;
            e.DisplayObjectContainer.prototype.updateTransform.call(this)
        }
    },e.Rope.prototype.setTexture = function (a) {
        this.texture = a, this.updateFrame = !0
    },e.TilingSprite = function (a, b, c) {
        e.Sprite.call(this, a), this.width = b || 100, this.height = c || 100, this.tileScale = new e.Point(1, 1), this.tileScaleOffset = new e.Point(1, 1), this.tilePosition = new e.Point(0, 0), this.renderable = !0, this.tint = 16777215, this.blendMode = e.blendModes.NORMAL
    },e.TilingSprite.prototype = Object.create(e.Sprite.prototype),e.TilingSprite.prototype.constructor = e.TilingSprite,Object.defineProperty(e.TilingSprite.prototype, "width", {
        get: function () {
            return this._width
        }, set: function (a) {
            this._width = a
        }
    }),Object.defineProperty(e.TilingSprite.prototype, "height", {
        get: function () {
            return this._height
        }, set: function (a) {
            this._height = a
        }
    }),e.TilingSprite.prototype.onTextureUpdate = function () {
        this.updateFrame = !0
    },e.TilingSprite.prototype._renderWebGL = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha) {
            var b, c;
            if (this.mask || this.filters) {
                for (this.mask && (a.spriteBatch.stop(), a.maskManager.pushMask(this.mask, a.projection), a.spriteBatch.start()), this.filters && (a.spriteBatch.flush(), a.filterManager.pushFilter(this._filterBlock)), this.tilingTexture ? a.spriteBatch.renderTilingSprite(this) : this.generateTilingTexture(!0), b = 0, c = this.children.length; c > b; b++) this.children[b]._renderWebGL(a);
                a.spriteBatch.stop(), this.filters && a.filterManager.popFilter(), this.mask && a.maskManager.popMask(a.projection), a.spriteBatch.start()
            } else for (this.tilingTexture ? a.spriteBatch.renderTilingSprite(this) : this.generateTilingTexture(!0), b = 0, c = this.children.length; c > b; b++) this.children[b]._renderWebGL(a)
        }
    },e.TilingSprite.prototype._renderCanvas = function (a) {
        if (this.visible !== !1 && 0 !== this.alpha) {
            var b = a.context;
            b.globalAlpha = this.worldAlpha;
            var c = this.worldTransform;
            b.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]), this.__tilePattern || (this.generateTilingTexture(!1), this.tilingTexture && (this.__tilePattern = b.createPattern(this.tilingTexture.baseTexture.source, "repeat"))), this.blendMode !== a.currentBlendMode && (a.currentBlendMode = this.blendMode, b.globalCompositeOperation = e.blendModesCanvas[a.currentBlendMode]), b.beginPath();
            var d = this.tilePosition, f = this.tileScale;
            b.scale(f.x, f.y), b.translate(d.x, d.y), b.fillStyle = this.__tilePattern, b.fillRect(-d.x, -d.y, this.width / f.x, this.height / f.y), b.scale(1 / f.x, 1 / f.y), b.translate(-d.x, -d.y), b.closePath()
        }
    },e.TilingSprite.prototype.getBounds = function () {
        var a = this._width, b = this._height, c = a * (1 - this.anchor.x), d = a * -this.anchor.x,
            e = b * (1 - this.anchor.y), f = b * -this.anchor.y, g = this.worldTransform, h = g[0], i = g[3], j = g[1],
            k = g[4], l = g[2], m = g[5], n = h * d + j * f + l, o = k * f + i * d + m, p = h * c + j * f + l,
            q = k * f + i * c + m, r = h * c + j * e + l, s = k * e + i * c + m, t = h * d + j * e + l,
            u = k * e + i * d + m, v = -1 / 0, w = -1 / 0, x = 1 / 0, y = 1 / 0;
        x = x > n ? n : x, x = x > p ? p : x, x = x > r ? r : x, x = x > t ? t : x, y = y > o ? o : y, y = y > q ? q : y, y = y > s ? s : y, y = y > u ? u : y, v = n > v ? n : v, v = p > v ? p : v, v = r > v ? r : v, v = t > v ? t : v, w = o > w ? o : w, w = q > w ? q : w, w = s > w ? s : w, w = u > w ? u : w;
        var z = this._bounds;
        return z.x = x, z.width = v - x, z.y = y, z.height = w - y, this._currentBounds = z, z
    },e.TilingSprite.prototype.generateTilingTexture = function (a) {
        var b = this.texture;
        if (b.baseTexture.hasLoaded) {
            var c, d, f = b.baseTexture, g = b.frame, h = g.width !== f.width || g.height !== f.height;
            this.tilingTexture = b;
            var i = !1;
            if (a ? (c = e.getNextPowerOfTwo(b.frame.width), d = e.getNextPowerOfTwo(b.frame.height), g.width !== c && g.height !== d && (i = !0)) : h && (c = g.width, d = g.height, i = !0), i) {
                var j = new e.CanvasBuffer(c, d);
                j.context.drawImage(b.baseTexture.source, g.x, g.y, g.width, g.height, 0, 0, c, d), this.tilingTexture = e.Texture.fromCanvas(j.canvas), this.tileScaleOffset.x = g.width / c, this.tileScaleOffset.y = g.height / d
            }
            this.tilingTexture.baseTexture._powerOf2 = !0
        }
    };
    var j = {};
    j.BoneData = function (a, b) {
        this.name = a, this.parent = b
    }, j.BoneData.prototype = {length: 0, x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1}, j.SlotData = function (a, b) {
        this.name = a, this.boneData = b
    }, j.SlotData.prototype = {r: 1, g: 1, b: 1, a: 1, attachmentName: null}, j.Bone = function (a, b) {
        this.data = a, this.parent = b, this.setToSetupPose()
    }, j.Bone.yDown = !1, j.Bone.prototype = {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        m00: 0,
        m01: 0,
        worldX: 0,
        m10: 0,
        m11: 0,
        worldY: 0,
        worldRotation: 0,
        worldScaleX: 1,
        worldScaleY: 1,
        updateWorldTransform: function (a, b) {
            var c = this.parent;
            null != c ? (this.worldX = this.x * c.m00 + this.y * c.m01 + c.worldX, this.worldY = this.x * c.m10 + this.y * c.m11 + c.worldY, this.worldScaleX = c.worldScaleX * this.scaleX, this.worldScaleY = c.worldScaleY * this.scaleY, this.worldRotation = c.worldRotation + this.rotation) : (this.worldX = this.x, this.worldY = this.y, this.worldScaleX = this.scaleX, this.worldScaleY = this.scaleY, this.worldRotation = this.rotation);
            var d = this.worldRotation * Math.PI / 180, e = Math.cos(d), f = Math.sin(d);
            this.m00 = e * this.worldScaleX, this.m10 = f * this.worldScaleX, this.m01 = -f * this.worldScaleY, this.m11 = e * this.worldScaleY, a && (this.m00 = -this.m00, this.m01 = -this.m01), b && (this.m10 = -this.m10, this.m11 = -this.m11), j.Bone.yDown && (this.m10 = -this.m10, this.m11 = -this.m11)
        },
        setToSetupPose: function () {
            var a = this.data;
            this.x = a.x, this.y = a.y, this.rotation = a.rotation, this.scaleX = a.scaleX, this.scaleY = a.scaleY
        }
    }, j.Slot = function (a, b, c) {
        this.data = a, this.skeleton = b, this.bone = c, this.setToSetupPose()
    }, j.Slot.prototype = {
        r: 1, g: 1, b: 1, a: 1, _attachmentTime: 0, attachment: null, setAttachment: function (a) {
            this.attachment = a, this._attachmentTime = this.skeleton.time
        }, setAttachmentTime: function (a) {
            this._attachmentTime = this.skeleton.time - a
        }, getAttachmentTime: function () {
            return this.skeleton.time - this._attachmentTime
        }, setToSetupPose: function () {
            var a = this.data;
            this.r = a.r, this.g = a.g, this.b = a.b, this.a = a.a;
            for (var b = this.skeleton.data.slots, c = 0, d = b.length; d > c; c++) if (b[c] == a) {
                this.setAttachment(a.attachmentName ? this.skeleton.getAttachmentBySlotIndex(c, a.attachmentName) : null);
                break
            }
        }
    }, j.Skin = function (a) {
        this.name = a, this.attachments = {}
    }, j.Skin.prototype = {
        addAttachment: function (a, b, c) {
            this.attachments[a + ":" + b] = c
        }, getAttachment: function (a, b) {
            return this.attachments[a + ":" + b]
        }, _attachAll: function (a, b) {
            for (var c in b.attachments) {
                var d = c.indexOf(":"), e = parseInt(c.substring(0, d), 10), f = c.substring(d + 1), g = a.slots[e];
                if (g.attachment && g.attachment.name == f) {
                    var h = this.getAttachment(e, f);
                    h && g.setAttachment(h)
                }
            }
        }
    }, j.Animation = function (a, b, c) {
        this.name = a, this.timelines = b, this.duration = c
    }, j.Animation.prototype = {
        apply: function (a, b, c) {
            c && this.duration && (b %= this.duration);
            for (var d = this.timelines, e = 0, f = d.length; f > e; e++) d[e].apply(a, b, 1)
        }, mix: function (a, b, c, d) {
            c && this.duration && (b %= this.duration);
            for (var e = this.timelines, f = 0, g = e.length; g > f; f++) e[f].apply(a, b, d)
        }
    }, j.binarySearch = function (a, b, c) {
        var d = 0, e = Math.floor(a.length / c) - 2;
        if (!e) return c;
        for (var f = e >>> 1; ;) {
            if (a[(f + 1) * c] <= b ? d = f + 1 : e = f, d == e) return (d + 1) * c;
            f = d + e >>> 1
        }
    }, j.linearSearch = function (a, b, c) {
        for (var d = 0, e = a.length - c; e >= d; d += c) if (a[d] > b) return d;
        return -1
    }, j.Curves = function (a) {
        this.curves = [], this.curves.length = 6 * (a - 1)
    }, j.Curves.prototype = {
        setLinear: function (a) {
            this.curves[6 * a] = 0
        }, setStepped: function (a) {
            this.curves[6 * a] = -1
        }, setCurve: function (a, b, c, d, e) {
            var f = .1, g = f * f, h = g * f, i = 3 * f, j = 3 * g, k = 6 * g, l = 6 * h, m = 2 * -b + d,
                n = 2 * -c + e, o = 3 * (b - d) + 1, p = 3 * (c - e) + 1, q = 6 * a, r = this.curves;
            r[q] = b * i + m * j + o * h, r[q + 1] = c * i + n * j + p * h, r[q + 2] = m * k + o * l, r[q + 3] = n * k + p * l, r[q + 4] = o * l, r[q + 5] = p * l
        }, getCurvePercent: function (a, b) {
            b = 0 > b ? 0 : b > 1 ? 1 : b;
            var c = 6 * a, d = this.curves, e = d[c];
            if (!e) return b;
            if (-1 == e) return 0;
            for (var f = d[c + 1], g = d[c + 2], h = d[c + 3], i = d[c + 4], j = d[c + 5], k = e, l = f, m = 8; ;) {
                if (k >= b) {
                    var n = k - e, o = l - f;
                    return o + (l - o) * (b - n) / (k - n)
                }
                if (!m) break;
                m--, e += g, f += h, g += i, h += j, k += e, l += f
            }
            return l + (1 - l) * (b - k) / (1 - k)
        }
    }, j.RotateTimeline = function (a) {
        this.curves = new j.Curves(a), this.frames = [], this.frames.length = 2 * a
    }, j.RotateTimeline.prototype = {
        boneIndex: 0, getFrameCount: function () {
            return this.frames.length / 2
        }, setFrame: function (a, b, c) {
            a *= 2, this.frames[a] = b, this.frames[a + 1] = c
        }, apply: function (a, b, c) {
            var d, e = this.frames;
            if (!(b < e[0])) {
                var f = a.bones[this.boneIndex];
                if (b >= e[e.length - 2]) {
                    for (d = f.data.rotation + e[e.length - 1] - f.rotation; d > 180;) d -= 360;
                    for (; -180 > d;) d += 360;
                    return f.rotation += d * c, void 0
                }
                var g = j.binarySearch(e, b, 2), h = e[g - 1], i = e[g], k = 1 - (b - i) / (e[g - 2] - i);
                for (k = this.curves.getCurvePercent(g / 2 - 1, k), d = e[g + 1] - h; d > 180;) d -= 360;
                for (; -180 > d;) d += 360;
                for (d = f.data.rotation + (h + d * k) - f.rotation; d > 180;) d -= 360;
                for (; -180 > d;) d += 360;
                f.rotation += d * c
            }
        }
    }, j.TranslateTimeline = function (a) {
        this.curves = new j.Curves(a), this.frames = [], this.frames.length = 3 * a
    }, j.TranslateTimeline.prototype = {
        boneIndex: 0, getFrameCount: function () {
            return this.frames.length / 3
        }, setFrame: function (a, b, c, d) {
            a *= 3, this.frames[a] = b, this.frames[a + 1] = c, this.frames[a + 2] = d
        }, apply: function (a, b, c) {
            var d = this.frames;
            if (!(b < d[0])) {
                var e = a.bones[this.boneIndex];
                if (b >= d[d.length - 3]) return e.x += (e.data.x + d[d.length - 2] - e.x) * c, e.y += (e.data.y + d[d.length - 1] - e.y) * c, void 0;
                var f = j.binarySearch(d, b, 3), g = d[f - 2], h = d[f - 1], i = d[f],
                    k = 1 - (b - i) / (d[f + -3] - i);
                k = this.curves.getCurvePercent(f / 3 - 1, k), e.x += (e.data.x + g + (d[f + 1] - g) * k - e.x) * c, e.y += (e.data.y + h + (d[f + 2] - h) * k - e.y) * c
            }
        }
    }, j.ScaleTimeline = function (a) {
        this.curves = new j.Curves(a), this.frames = [], this.frames.length = 3 * a
    }, j.ScaleTimeline.prototype = {
        boneIndex: 0, getFrameCount: function () {
            return this.frames.length / 3
        }, setFrame: function (a, b, c, d) {
            a *= 3, this.frames[a] = b, this.frames[a + 1] = c, this.frames[a + 2] = d
        }, apply: function (a, b, c) {
            var d = this.frames;
            if (!(b < d[0])) {
                var e = a.bones[this.boneIndex];
                if (b >= d[d.length - 3]) return e.scaleX += (e.data.scaleX - 1 + d[d.length - 2] - e.scaleX) * c, e.scaleY += (e.data.scaleY - 1 + d[d.length - 1] - e.scaleY) * c, void 0;
                var f = j.binarySearch(d, b, 3), g = d[f - 2], h = d[f - 1], i = d[f],
                    k = 1 - (b - i) / (d[f + -3] - i);
                k = this.curves.getCurvePercent(f / 3 - 1, k), e.scaleX += (e.data.scaleX - 1 + g + (d[f + 1] - g) * k - e.scaleX) * c, e.scaleY += (e.data.scaleY - 1 + h + (d[f + 2] - h) * k - e.scaleY) * c
            }
        }
    }, j.ColorTimeline = function (a) {
        this.curves = new j.Curves(a), this.frames = [], this.frames.length = 5 * a
    }, j.ColorTimeline.prototype = {
        slotIndex: 0, getFrameCount: function () {
            return this.frames.length / 2
        }, setFrame: function (c, d) {
            c *= 5, this.frames[c] = d, this.frames[c + 1] = r, this.frames[c + 2] = g, this.frames[c + 3] = b, this.frames[c + 4] = a
        }, apply: function (a, b, c) {
            var d = this.frames;
            if (!(b < d[0])) {
                var e = a.slots[this.slotIndex];
                if (b >= d[d.length - 5]) {
                    var f = d.length - 1;
                    return e.r = d[f - 3], e.g = d[f - 2], e.b = d[f - 1], e.a = d[f], void 0
                }
                var g = j.binarySearch(d, b, 5), h = d[g - 4], i = d[g - 3], k = d[g - 2], l = d[g - 1], m = d[g],
                    n = 1 - (b - m) / (d[g - 5] - m);
                n = this.curves.getCurvePercent(g / 5 - 1, n);
                var o = h + (d[g + 1] - h) * n, p = i + (d[g + 2] - i) * n, q = k + (d[g + 3] - k) * n,
                    r = l + (d[g + 4] - l) * n;
                1 > c ? (e.r += (o - e.r) * c, e.g += (p - e.g) * c, e.b += (q - e.b) * c, e.a += (r - e.a) * c) : (e.r = o, e.g = p, e.b = q, e.a = r)
            }
        }
    }, j.AttachmentTimeline = function (a) {
        this.curves = new j.Curves(a), this.frames = [], this.frames.length = a, this.attachmentNames = [], this.attachmentNames.length = a
    }, j.AttachmentTimeline.prototype = {
        slotIndex: 0, getFrameCount: function () {
            return this.frames.length
        }, setFrame: function (a, b, c) {
            this.frames[a] = b, this.attachmentNames[a] = c
        }, apply: function (a, b) {
            var c = this.frames;
            if (!(b < c[0])) {
                var d;
                d = b >= c[c.length - 1] ? c.length - 1 : j.binarySearch(c, b, 1) - 1;
                var e = this.attachmentNames[d];
                a.slots[this.slotIndex].setAttachment(e ? a.getAttachmentBySlotIndex(this.slotIndex, e) : null)
            }
        }
    }, j.SkeletonData = function () {
        this.bones = [], this.slots = [], this.skins = [], this.animations = []
    }, j.SkeletonData.prototype = {
        defaultSkin: null, findBone: function (a) {
            for (var b = this.bones, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return b[c];
            return null
        }, findBoneIndex: function (a) {
            for (var b = this.bones, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return c;
            return -1
        }, findSlot: function (a) {
            for (var b = this.slots, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return slot[c];
            return null
        }, findSlotIndex: function (a) {
            for (var b = this.slots, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return c;
            return -1
        }, findSkin: function (a) {
            for (var b = this.skins, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return b[c];
            return null
        }, findAnimation: function (a) {
            for (var b = this.animations, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return b[c];
            return null
        }
    }, j.Skeleton = function (a) {
        this.data = a, this.bones = [];
        for (var b = 0, c = a.bones.length; c > b; b++) {
            var d = a.bones[b], e = d.parent ? this.bones[a.bones.indexOf(d.parent)] : null;
            this.bones.push(new j.Bone(d, e))
        }
        for (this.slots = [], this.drawOrder = [], b = 0, c = a.slots.length; c > b; b++) {
            var f = a.slots[b], g = this.bones[a.bones.indexOf(f.boneData)], h = new j.Slot(f, this, g);
            this.slots.push(h), this.drawOrder.push(h)
        }
    }, j.Skeleton.prototype = {
        x: 0,
        y: 0,
        skin: null,
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        time: 0,
        flipX: !1,
        flipY: !1,
        updateWorldTransform: function () {
            for (var a = this.flipX, b = this.flipY, c = this.bones, d = 0, e = c.length; e > d; d++) c[d].updateWorldTransform(a, b)
        },
        setToSetupPose: function () {
            this.setBonesToSetupPose(), this.setSlotsToSetupPose()
        },
        setBonesToSetupPose: function () {
            for (var a = this.bones, b = 0, c = a.length; c > b; b++) a[b].setToSetupPose()
        },
        setSlotsToSetupPose: function () {
            for (var a = this.slots, b = 0, c = a.length; c > b; b++) a[b].setToSetupPose(b)
        },
        getRootBone: function () {
            return this.bones.length ? this.bones[0] : null
        },
        findBone: function (a) {
            for (var b = this.bones, c = 0, d = b.length; d > c; c++) if (b[c].data.name == a) return b[c];
            return null
        },
        findBoneIndex: function (a) {
            for (var b = this.bones, c = 0, d = b.length; d > c; c++) if (b[c].data.name == a) return c;
            return -1
        },
        findSlot: function (a) {
            for (var b = this.slots, c = 0, d = b.length; d > c; c++) if (b[c].data.name == a) return b[c];
            return null
        },
        findSlotIndex: function (a) {
            for (var b = this.slots, c = 0, d = b.length; d > c; c++) if (b[c].data.name == a) return c;
            return -1
        },
        setSkinByName: function (a) {
            var b = this.data.findSkin(a);
            if (!b) throw"Skin not found: " + a;
            this.setSkin(b)
        },
        setSkin: function (a) {
            this.skin && a && a._attachAll(this, this.skin), this.skin = a
        },
        getAttachmentBySlotName: function (a, b) {
            return this.getAttachmentBySlotIndex(this.data.findSlotIndex(a), b)
        },
        getAttachmentBySlotIndex: function (a, b) {
            if (this.skin) {
                var c = this.skin.getAttachment(a, b);
                if (c) return c
            }
            return this.data.defaultSkin ? this.data.defaultSkin.getAttachment(a, b) : null
        },
        setAttachment: function (a, b) {
            for (var c = this.slots, d = 0, e = c.size; e > d; d++) {
                var f = c[d];
                if (f.data.name == a) {
                    var g = null;
                    if (b && (g = this.getAttachment(d, b), null == g)) throw"Attachment not found: " + b + ", for slot: " + a;
                    return f.setAttachment(g), void 0
                }
            }
            throw"Slot not found: " + a
        },
        update: function (a) {
            time += a
        }
    }, j.AttachmentType = {region: 0}, j.RegionAttachment = function () {
        this.offset = [], this.offset.length = 8, this.uvs = [], this.uvs.length = 8
    }, j.RegionAttachment.prototype = {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        width: 0,
        height: 0,
        rendererObject: null,
        regionOffsetX: 0,
        regionOffsetY: 0,
        regionWidth: 0,
        regionHeight: 0,
        regionOriginalWidth: 0,
        regionOriginalHeight: 0,
        setUVs: function (a, b, c, d, e) {
            var f = this.uvs;
            e ? (f[2] = a, f[3] = d, f[4] = a, f[5] = b, f[6] = c, f[7] = b, f[0] = c, f[1] = d) : (f[0] = a, f[1] = d, f[2] = a, f[3] = b, f[4] = c, f[5] = b, f[6] = c, f[7] = d)
        },
        updateOffset: function () {
            var a = this.width / this.regionOriginalWidth * this.scaleX,
                b = this.height / this.regionOriginalHeight * this.scaleY,
                c = -this.width / 2 * this.scaleX + this.regionOffsetX * a,
                d = -this.height / 2 * this.scaleY + this.regionOffsetY * b, e = c + this.regionWidth * a,
                f = d + this.regionHeight * b, g = this.rotation * Math.PI / 180, h = Math.cos(g), i = Math.sin(g),
                j = c * h + this.x, k = c * i, l = d * h + this.y, m = d * i, n = e * h + this.x, o = e * i,
                p = f * h + this.y, q = f * i, r = this.offset;
            r[0] = j - m, r[1] = l + k, r[2] = j - q, r[3] = p + k, r[4] = n - q, r[5] = p + o, r[6] = n - m, r[7] = l + o
        },
        computeVertices: function (a, b, c, d) {
            a += c.worldX, b += c.worldY;
            var e = c.m00, f = c.m01, g = c.m10, h = c.m11, i = this.offset;
            d[0] = i[0] * e + i[1] * f + a, d[1] = i[0] * g + i[1] * h + b, d[2] = i[2] * e + i[3] * f + a, d[3] = i[2] * g + i[3] * h + b, d[4] = i[4] * e + i[5] * f + a, d[5] = i[4] * g + i[5] * h + b, d[6] = i[6] * e + i[7] * f + a, d[7] = i[6] * g + i[7] * h + b
        }
    }, j.AnimationStateData = function (a) {
        this.skeletonData = a, this.animationToMixTime = {}
    }, j.AnimationStateData.prototype = {
        defaultMix: 0, setMixByName: function (a, b, c) {
            var d = this.skeletonData.findAnimation(a);
            if (!d) throw"Animation not found: " + a;
            var e = this.skeletonData.findAnimation(b);
            if (!e) throw"Animation not found: " + b;
            this.setMix(d, e, c)
        }, setMix: function (a, b, c) {
            this.animationToMixTime[a.name + ":" + b.name] = c
        }, getMix: function (a, b) {
            var c = this.animationToMixTime[a.name + ":" + b.name];
            return c ? c : this.defaultMix
        }
    }, j.AnimationState = function (a) {
        this.data = a, this.queue = []
    }, j.AnimationState.prototype = {
        current: null,
        previous: null,
        currentTime: 0,
        previousTime: 0,
        currentLoop: !1,
        previousLoop: !1,
        mixTime: 0,
        mixDuration: 0,
        update: function (a) {
            if (this.currentTime += a, this.previousTime += a, this.mixTime += a, this.queue.length > 0) {
                var b = this.queue[0];
                this.currentTime >= b.delay && (this._setAnimation(b.animation, b.loop), this.queue.shift())
            }
        },
        apply: function (a) {
            if (this.current) if (this.previous) {
                this.previous.apply(a, this.previousTime, this.previousLoop);
                var b = this.mixTime / this.mixDuration;
                b >= 1 && (b = 1, this.previous = null), this.current.mix(a, this.currentTime, this.currentLoop, b)
            } else this.current.apply(a, this.currentTime, this.currentLoop)
        },
        clearAnimation: function () {
            this.previous = null, this.current = null, this.queue.length = 0
        },
        _setAnimation: function (a, b) {
            this.previous = null, a && this.current && (this.mixDuration = this.data.getMix(this.current, a), this.mixDuration > 0 && (this.mixTime = 0, this.previous = this.current, this.previousTime = this.currentTime, this.previousLoop = this.currentLoop)), this.current = a, this.currentLoop = b, this.currentTime = 0
        },
        setAnimationByName: function (a, b) {
            var c = this.data.skeletonData.findAnimation(a);
            if (!c) throw"Animation not found: " + a;
            this.setAnimation(c, b)
        },
        setAnimation: function (a, b) {
            this.queue.length = 0, this._setAnimation(a, b)
        },
        addAnimationByName: function (a, b, c) {
            var d = this.data.skeletonData.findAnimation(a);
            if (!d) throw"Animation not found: " + a;
            this.addAnimation(d, b, c)
        },
        addAnimation: function (a, b, c) {
            var d = {};
            if (d.animation = a, d.loop = b, !c || 0 >= c) {
                var e = this.queue.length ? this.queue[this.queue.length - 1].animation : this.current;
                c = null != e ? e.duration - this.data.getMix(e, a) + (c || 0) : 0
            }
            d.delay = c, this.queue.push(d)
        },
        isComplete: function () {
            return !this.current || this.currentTime >= this.current.duration
        }
    }, j.SkeletonJson = function (a) {
        this.attachmentLoader = a
    }, j.SkeletonJson.prototype = {
        scale: 1, readSkeletonData: function (a) {
            for (var b, c = new j.SkeletonData, d = a.bones, e = 0, f = d.length; f > e; e++) {
                var g = d[e], h = null;
                if (g.parent && (h = c.findBone(g.parent), !h)) throw"Parent bone not found: " + g.parent;
                b = new j.BoneData(g.name, h), b.length = (g.length || 0) * this.scale, b.x = (g.x || 0) * this.scale, b.y = (g.y || 0) * this.scale, b.rotation = g.rotation || 0, b.scaleX = g.scaleX || 1, b.scaleY = g.scaleY || 1, c.bones.push(b)
            }
            var i = a.slots;
            for (e = 0, f = i.length; f > e; e++) {
                var k = i[e];
                if (b = c.findBone(k.bone), !b) throw"Slot bone not found: " + k.bone;
                var l = new j.SlotData(k.name, b), m = k.color;
                m && (l.r = j.SkeletonJson.toColor(m, 0), l.g = j.SkeletonJson.toColor(m, 1), l.b = j.SkeletonJson.toColor(m, 2), l.a = j.SkeletonJson.toColor(m, 3)), l.attachmentName = k.attachment, c.slots.push(l)
            }
            var n = a.skins;
            for (var o in n) if (n.hasOwnProperty(o)) {
                var p = n[o], q = new j.Skin(o);
                for (var r in p) if (p.hasOwnProperty(r)) {
                    var s = c.findSlotIndex(r), t = p[r];
                    for (var u in t) if (t.hasOwnProperty(u)) {
                        var v = this.readAttachment(q, u, t[u]);
                        null != v && q.addAttachment(s, u, v)
                    }
                }
                c.skins.push(q), "default" == q.name && (c.defaultSkin = q)
            }
            var w = a.animations;
            for (var x in w) w.hasOwnProperty(x) && this.readAnimation(x, w[x], c);
            return c
        }, readAttachment: function (a, b, c) {
            b = c.name || b;
            var d = j.AttachmentType[c.type || "region"];
            if (d == j.AttachmentType.region) {
                var e = new j.RegionAttachment;
                return e.x = (c.x || 0) * this.scale, e.y = (c.y || 0) * this.scale, e.scaleX = c.scaleX || 1, e.scaleY = c.scaleY || 1, e.rotation = c.rotation || 0, e.width = (c.width || 32) * this.scale, e.height = (c.height || 32) * this.scale, e.updateOffset(), e.rendererObject = {}, e.rendererObject.name = b, e.rendererObject.scale = {}, e.rendererObject.scale.x = e.scaleX, e.rendererObject.scale.y = e.scaleY, e.rendererObject.rotation = -e.rotation * Math.PI / 180, e
            }
            throw"Unknown attachment type: " + d
        }, readAnimation: function (a, b, c) {
            var d, e, f, g, h, i, k, l = [], m = 0, n = b.bones;
            for (var o in n) if (n.hasOwnProperty(o)) {
                var p = c.findBoneIndex(o);
                if (-1 == p) throw"Bone not found: " + o;
                var q = n[o];
                for (f in q) if (q.hasOwnProperty(f)) if (h = q[f], "rotate" == f) {
                    for (e = new j.RotateTimeline(h.length), e.boneIndex = p, d = 0, i = 0, k = h.length; k > i; i++) g = h[i], e.setFrame(d, g.time, g.angle), j.SkeletonJson.readCurve(e, d, g), d++;
                    l.push(e), m = Math.max(m, e.frames[2 * e.getFrameCount() - 2])
                } else {
                    if ("translate" != f && "scale" != f) throw"Invalid timeline type for a bone: " + f + " (" + o + ")";
                    var r = 1;
                    for ("scale" == f ? e = new j.ScaleTimeline(h.length) : (e = new j.TranslateTimeline(h.length), r = this.scale), e.boneIndex = p, d = 0, i = 0, k = h.length; k > i; i++) {
                        g = h[i];
                        var s = (g.x || 0) * r, t = (g.y || 0) * r;
                        e.setFrame(d, g.time, s, t), j.SkeletonJson.readCurve(e, d, g), d++
                    }
                    l.push(e), m = Math.max(m, e.frames[3 * e.getFrameCount() - 3])
                }
            }
            var u = b.slots;
            for (var v in u) if (u.hasOwnProperty(v)) {
                var w = u[v], x = c.findSlotIndex(v);
                for (f in w) if (w.hasOwnProperty(f)) if (h = w[f], "color" == f) {
                    for (e = new j.ColorTimeline(h.length), e.slotIndex = x, d = 0, i = 0, k = h.length; k > i; i++) {
                        g = h[i];
                        var y = g.color, z = j.SkeletonJson.toColor(y, 0), A = j.SkeletonJson.toColor(y, 1),
                            B = j.SkeletonJson.toColor(y, 2), C = j.SkeletonJson.toColor(y, 3);
                        e.setFrame(d, g.time, z, A, B, C), j.SkeletonJson.readCurve(e, d, g), d++
                    }
                    l.push(e), m = Math.max(m, e.frames[5 * e.getFrameCount() - 5])
                } else {
                    if ("attachment" != f) throw"Invalid timeline type for a slot: " + f + " (" + v + ")";
                    for (e = new j.AttachmentTimeline(h.length), e.slotIndex = x, d = 0, i = 0, k = h.length; k > i; i++) g = h[i], e.setFrame(d++, g.time, g.name);
                    l.push(e), m = Math.max(m, e.frames[e.getFrameCount() - 1])
                }
            }
            c.animations.push(new j.Animation(a, l, m))
        }
    }, j.SkeletonJson.readCurve = function (a, b, c) {
        var d = c.curve;
        d && ("stepped" == d ? a.curves.setStepped(b) : d instanceof Array && a.curves.setCurve(b, d[0], d[1], d[2], d[3]))
    }, j.SkeletonJson.toColor = function (a, b) {
        if (8 != a.length) throw"Color hexidecimal length must be 8, recieved: " + a;
        return parseInt(a.substring(2 * b, 2), 16) / 255
    }, j.Atlas = function (a, b) {
        this.textureLoader = b, this.pages = [], this.regions = [];
        var c = new j.AtlasReader(a), d = [];
        d.length = 4;
        for (var e = null; ;) {
            var f = c.readLine();
            if (null == f) break;
            if (f = c.trim(f), f.length) if (e) {
                var g = new j.AtlasRegion;
                g.name = f, g.page = e, g.rotate = "true" == c.readValue(), c.readTuple(d);
                var h = parseInt(d[0], 10), i = parseInt(d[1], 10);
                c.readTuple(d);
                var k = parseInt(d[0], 10), l = parseInt(d[1], 10);
                g.u = h / e.width, g.v = i / e.height, g.rotate ? (g.u2 = (h + l) / e.width, g.v2 = (i + k) / e.height) : (g.u2 = (h + k) / e.width, g.v2 = (i + l) / e.height), g.x = h, g.y = i, g.width = Math.abs(k), g.height = Math.abs(l), 4 == c.readTuple(d) && (g.splits = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)], 4 == c.readTuple(d) && (g.pads = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)], c.readTuple(d))), g.originalWidth = parseInt(d[0], 10), g.originalHeight = parseInt(d[1], 10), c.readTuple(d), g.offsetX = parseInt(d[0], 10), g.offsetY = parseInt(d[1], 10), g.index = parseInt(c.readValue(), 10), this.regions.push(g)
            } else {
                e = new j.AtlasPage, e.name = f, e.format = j.Atlas.Format[c.readValue()], c.readTuple(d), e.minFilter = j.Atlas.TextureFilter[d[0]], e.magFilter = j.Atlas.TextureFilter[d[1]];
                var m = c.readValue();
                e.uWrap = j.Atlas.TextureWrap.clampToEdge, e.vWrap = j.Atlas.TextureWrap.clampToEdge, "x" == m ? e.uWrap = j.Atlas.TextureWrap.repeat : "y" == m ? e.vWrap = j.Atlas.TextureWrap.repeat : "xy" == m && (e.uWrap = e.vWrap = j.Atlas.TextureWrap.repeat), b.load(e, f), this.pages.push(e)
            } else e = null
        }
    }, j.Atlas.prototype = {
        findRegion: function (a) {
            for (var b = this.regions, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return b[c];
            return null
        }, dispose: function () {
            for (var a = this.pages, b = 0, c = a.length; c > b; b++) this.textureLoader.unload(a[b].rendererObject)
        }, updateUVs: function (a) {
            for (var b = this.regions, c = 0, d = b.length; d > c; c++) {
                var e = b[c];
                e.page == a && (e.u = e.x / a.width, e.v = e.y / a.height, e.rotate ? (e.u2 = (e.x + e.height) / a.width, e.v2 = (e.y + e.width) / a.height) : (e.u2 = (e.x + e.width) / a.width, e.v2 = (e.y + e.height) / a.height))
            }
        }
    }, j.Atlas.Format = {
        alpha: 0,
        intensity: 1,
        luminanceAlpha: 2,
        rgb565: 3,
        rgba4444: 4,
        rgb888: 5,
        rgba8888: 6
    }, j.Atlas.TextureFilter = {
        nearest: 0,
        linear: 1,
        mipMap: 2,
        mipMapNearestNearest: 3,
        mipMapLinearNearest: 4,
        mipMapNearestLinear: 5,
        mipMapLinearLinear: 6
    }, j.Atlas.TextureWrap = {mirroredRepeat: 0, clampToEdge: 1, repeat: 2}, j.AtlasPage = function () {
    }, j.AtlasPage.prototype = {
        name: null,
        format: null,
        minFilter: null,
        magFilter: null,
        uWrap: null,
        vWrap: null,
        rendererObject: null,
        width: 0,
        height: 0
    }, j.AtlasRegion = function () {
    }, j.AtlasRegion.prototype = {
        page: null,
        name: null,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        u: 0,
        v: 0,
        u2: 0,
        v2: 0,
        offsetX: 0,
        offsetY: 0,
        originalWidth: 0,
        originalHeight: 0,
        index: 0,
        rotate: !1,
        splits: null,
        pads: null
    }, j.AtlasReader = function (a) {
        this.lines = a.split(/\r\n|\r|\n/)
    }, j.AtlasReader.prototype = {
        index: 0, trim: function (a) {
            return a.replace(/^\s+|\s+$/g, "")
        }, readLine: function () {
            return this.index >= this.lines.length ? null : this.lines[this.index++]
        }, readValue: function () {
            var a = this.readLine(), b = a.indexOf(":");
            if (-1 == b) throw"Invalid line: " + a;
            return this.trim(a.substring(b + 1))
        }, readTuple: function (a) {
            var b = this.readLine(), c = b.indexOf(":");
            if (-1 == c) throw"Invalid line: " + b;
            for (var d = 0, e = c + 1; 3 > d; d++) {
                var f = b.indexOf(",", e);
                if (-1 == f) {
                    if (!d) throw"Invalid line: " + b;
                    break
                }
                a[d] = this.trim(b.substr(e, f - e)), e = f + 1
            }
            return a[d] = this.trim(b.substring(e)), d + 1
        }
    }, j.AtlasAttachmentLoader = function (a) {
        this.atlas = a
    }, j.AtlasAttachmentLoader.prototype = {
        newAttachment: function (a, b, c) {
            switch (b) {
                case j.AttachmentType.region:
                    var d = this.atlas.findRegion(c);
                    if (!d) throw"Region not found in atlas: " + c + " (" + b + ")";
                    var e = new j.RegionAttachment(c);
                    return e.rendererObject = d, e.setUVs(d.u, d.v, d.u2, d.v2, d.rotate), e.regionOffsetX = d.offsetX, e.regionOffsetY = d.offsetY, e.regionWidth = d.width, e.regionHeight = d.height, e.regionOriginalWidth = d.originalWidth, e.regionOriginalHeight = d.originalHeight, e
            }
            throw"Unknown attachment type: " + b
        }
    }, j.Bone.yDown = !0, e.AnimCache = {}, e.Spine = function (a) {
        if (e.DisplayObjectContainer.call(this), this.spineData = e.AnimCache[a], !this.spineData) throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + a);
        this.skeleton = new j.Skeleton(this.spineData), this.skeleton.updateWorldTransform(), this.stateData = new j.AnimationStateData(this.spineData), this.state = new j.AnimationState(this.stateData), this.slotContainers = [];
        for (var b = 0, c = this.skeleton.drawOrder.length; c > b; b++) {
            var d = this.skeleton.drawOrder[b], f = d.attachment, g = new e.DisplayObjectContainer;
            if (this.slotContainers.push(g), this.addChild(g), f instanceof j.RegionAttachment) {
                var h = f.rendererObject.name, i = this.createSprite(d, f.rendererObject);
                d.currentSprite = i, d.currentSpriteName = h, g.addChild(i)
            }
        }
    }, e.Spine.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Spine.prototype.constructor = e.Spine, e.Spine.prototype.updateTransform = function () {
        this.lastTime = this.lastTime || Date.now();
        var a = .001 * (Date.now() - this.lastTime);
        this.lastTime = Date.now(), this.state.update(a), this.state.apply(this.skeleton), this.skeleton.updateWorldTransform();
        for (var b = this.skeleton.drawOrder, c = 0, d = b.length; d > c; c++) {
            var f = b[c], g = f.attachment, h = this.slotContainers[c];
            if (g instanceof j.RegionAttachment) {
                if (g.rendererObject && (!f.currentSpriteName || f.currentSpriteName != g.name)) {
                    var i = g.rendererObject.name;
                    if (void 0 !== f.currentSprite && (f.currentSprite.visible = !1), f.sprites = f.sprites || {}, void 0 !== f.sprites[i]) f.sprites[i].visible = !0; else {
                        var k = this.createSprite(f, g.rendererObject);
                        h.addChild(k)
                    }
                    f.currentSprite = f.sprites[i], f.currentSpriteName = i
                }
                h.visible = !0;
                var l = f.bone;
                h.position.x = l.worldX + g.x * l.m00 + g.y * l.m01, h.position.y = l.worldY + g.x * l.m10 + g.y * l.m11, h.scale.x = l.worldScaleX, h.scale.y = l.worldScaleY, h.rotation = -(f.bone.worldRotation * Math.PI / 180)
            } else h.visible = !1
        }
        e.DisplayObjectContainer.prototype.updateTransform.call(this)
    }, e.Spine.prototype.createSprite = function (a, b) {
        var c = e.TextureCache[b.name] ? b.name : b.name + ".png", d = new e.Sprite(e.Texture.fromFrame(c));
        return d.scale = b.scale, d.rotation = b.rotation, d.anchor.x = d.anchor.y = .5, a.sprites = a.sprites || {}, a.sprites[b.name] = d, d
    }, e.BaseTextureCache = {}, e.texturesToUpdate = [], e.texturesToDestroy = [], e.BaseTexture = function (a, b) {
        if (e.EventTarget.call(this), this.width = 100, this.height = 100, this.scaleMode = b || e.BaseTexture.SCALE_MODE.DEFAULT, this.hasLoaded = !1, this.source = a, a) {
            if (this.source instanceof Image || this.source instanceof HTMLImageElement) if (this.source.complete) this.hasLoaded = !0, this.width = this.source.width, this.height = this.source.height, e.texturesToUpdate.push(this); else {
                var c = this;
                this.source.onload = function () {
                    c.hasLoaded = !0, c.width = c.source.width, c.height = c.source.height, e.texturesToUpdate.push(c), c.dispatchEvent({
                        type: "loaded",
                        content: c
                    })
                }
            } else this.hasLoaded = !0, this.width = this.source.width, this.height = this.source.height, e.texturesToUpdate.push(this);
            this.imageUrl = null, this._powerOf2 = !1, this._glTextures = []
        }
    }, e.BaseTexture.prototype.constructor = e.BaseTexture, e.BaseTexture.prototype.destroy = function () {
        this.source instanceof Image && (this.imageUrl in e.BaseTextureCache && delete e.BaseTextureCache[this.imageUrl], this.imageUrl = null, this.source.src = null), this.source = null, e.texturesToDestroy.push(this)
    }, e.BaseTexture.prototype.updateSourceImage = function (a) {
        this.hasLoaded = !1, this.source.src = null, this.source.src = a
    }, e.BaseTexture.fromImage = function (a, b, c) {
        var d = e.BaseTextureCache[a];
        if (!d) {
            var f = new Image;
            b && (f.crossOrigin = ""), f.src = a, d = new e.BaseTexture(f, c), d.imageUrl = a, e.BaseTextureCache[a] = d
        }
        return d
    }, e.BaseTexture.SCALE_MODE = {
        DEFAULT: 0,
        LINEAR: 0,
        NEAREST: 1
    }, e.TextureCache = {}, e.FrameCache = {}, e.Texture = function (a, b) {
        if (e.EventTarget.call(this), b || (this.noFrame = !0, b = new e.Rectangle(0, 0, 1, 1)), a instanceof e.Texture && (a = a.baseTexture), this.baseTexture = a, this.frame = b, this.trim = new e.Point, this.scope = this, a.hasLoaded) this.noFrame && (b = new e.Rectangle(0, 0, a.width, a.height)), this.setFrame(b); else {
            var c = this;
            a.addEventListener("loaded", function () {
                c.onBaseTextureLoaded()
            })
        }
    }, e.Texture.prototype.constructor = e.Texture, e.Texture.prototype.onBaseTextureLoaded = function () {
        var a = this.baseTexture;
        a.removeEventListener("loaded", this.onLoaded), this.noFrame && (this.frame = new e.Rectangle(0, 0, a.width, a.height)), this.setFrame(this.frame), this.scope.dispatchEvent({
            type: "update",
            content: this
        })
    }, e.Texture.prototype.destroy = function (a) {
        a && this.baseTexture.destroy()
    }, e.Texture.prototype.setFrame = function (a) {
        if (this.frame = a, this.width = a.width, this.height = a.height, a.x + a.width > this.baseTexture.width || a.y + a.height > this.baseTexture.height) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
        this.updateFrame = !0, e.Texture.frameUpdates.push(this)
    }, e.Texture.prototype._updateWebGLuvs = function () {
        this._uvs || (this._uvs = new Float32Array(8));
        var a = this.frame, b = this.baseTexture.width, c = this.baseTexture.height;
        this._uvs[0] = a.x / b, this._uvs[1] = a.y / c, this._uvs[2] = (a.x + a.width) / b, this._uvs[3] = a.y / c, this._uvs[4] = (a.x + a.width) / b, this._uvs[5] = (a.y + a.height) / c, this._uvs[6] = a.x / b, this._uvs[7] = (a.y + a.height) / c
    }, e.Texture.fromImage = function (a, b, c) {
        var d = e.TextureCache[a];
        return d || (d = new e.Texture(e.BaseTexture.fromImage(a, b, c)), e.TextureCache[a] = d), d
    }, e.Texture.fromFrame = function (a) {
        var b = e.TextureCache[a];
        if (!b) throw new Error('The frameId "' + a + '" does not exist in the texture cache ' + this);
        return b
    }, e.Texture.fromCanvas = function (a, b) {
        var c = new e.BaseTexture(a, b);
        return new e.Texture(c)
    }, e.Texture.addTextureToCache = function (a, b) {
        e.TextureCache[b] = a
    }, e.Texture.removeTextureFromCache = function (a) {
        var b = e.TextureCache[a];
        return e.TextureCache[a] = null, b
    }, e.Texture.frameUpdates = [], e.Texture.SCALE_MODE = e.BaseTexture.SCALE_MODE, e.RenderTexture = function (a, b, c) {
        if (e.EventTarget.call(this), this.width = a || 100, this.height = b || 100, this.indetityMatrix = e.mat3.create(), this.frame = new e.Rectangle(0, 0, this.width, this.height), this.baseTexture = new e.BaseTexture, this.baseTexture.width = this.width, this.baseTexture.height = this.height, this.baseTexture._glTextures = [], this.baseTexture.hasLoaded = !0, this.renderer = c || e.defaultRenderer, this.renderer.type === e.WEBGL_RENDERER) {
            var d = this.renderer.gl;
            this.textureBuffer = new e.FilterTexture(d, this.width, this.height), this.baseTexture._glTextures[d.id] = this.textureBuffer.texture, this.render = this.renderWebGL, this.projection = new e.Point(this.width / 2, -this.height / 2)
        } else this.render = this.renderCanvas, this.textureBuffer = new e.CanvasBuffer(this.width, this.height), this.baseTexture.source = this.textureBuffer.canvas;
        e.Texture.frameUpdates.push(this)
    }, e.RenderTexture.prototype = Object.create(e.Texture.prototype), e.RenderTexture.prototype.constructor = e.RenderTexture, e.RenderTexture.prototype.resize = function (a, b) {
        if (this.width = a, this.height = b, this.frame.width = this.width, this.frame.height = this.height, this.renderer.type === e.WEBGL_RENDERER) {
            this.projection.x = this.width / 2, this.projection.y = -this.height / 2;
            var c = this.gl;
            c.bindTexture(c.TEXTURE_2D, this.baseTexture._glTextures[c.id]), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, this.width, this.height, 0, c.RGBA, c.UNSIGNED_BYTE, null)
        } else this.textureBuffer.resize(this.width, this.height);
        e.Texture.frameUpdates.push(this)
    }, e.RenderTexture.prototype.renderWebGL = function (a, b, c) {
        var d = this.renderer.gl;
        d.colorMask(!0, !0, !0, !0), d.viewport(0, 0, this.width, this.height), d.bindFramebuffer(d.FRAMEBUFFER, this.textureBuffer.frameBuffer), c && this.textureBuffer.clear();
        var f = a.children, g = a.worldTransform;
        a.worldTransform = e.mat3.create(), a.worldTransform[4] = -1, a.worldTransform[5] = -2 * this.projection.y, b && (a.worldTransform[2] = b.x, a.worldTransform[5] -= b.y), e.visibleCount++, a.vcount = e.visibleCount;
        for (var h = 0, i = f.length; i > h; h++) f[h].updateTransform();
        this.renderer.renderDisplayObject(a, this.projection), a.worldTransform = g
    }, e.RenderTexture.prototype.renderCanvas = function (a, b, c) {
        var d = a.children;
        a.worldTransform = e.mat3.create(), b && (a.worldTransform[2] = b.x, a.worldTransform[5] = b.y);
        for (var f = 0, g = d.length; g > f; f++) d[f].updateTransform();
        c && this.textureBuffer.clear();
        var h = this.textureBuffer.context;
        this.renderer.renderDisplayObject(a, h), h.setTransform(1, 0, 0, 1, 0, 0)
    }, e.AssetLoader = function (a, b) {
        e.EventTarget.call(this), this.assetURLs = a, this.crossorigin = b, this.loadersByType = {
            jpg: e.ImageLoader,
            jpeg: e.ImageLoader,
            png: e.ImageLoader,
            gif: e.ImageLoader,
            json: e.JsonLoader,
            atlas: e.AtlasLoader,
            anim: e.SpineLoader,
            xml: e.BitmapFontLoader,
            fnt: e.BitmapFontLoader
        }
    }, e.AssetLoader.prototype.constructor = e.AssetLoader, e.AssetLoader.prototype._getDataType = function (a) {
        var b = "data:", c = a.slice(0, b.length).toLowerCase();
        if (c === b) {
            var d = a.slice(b.length), e = d.indexOf(",");
            if (-1 === e) return null;
            var f = d.slice(0, e).split(";")[0];
            return f && "text/plain" !== f.toLowerCase() ? f.split("/").pop().toLowerCase() : "txt"
        }
        return null
    }, e.AssetLoader.prototype.load = function () {
        function a() {
            b.onAssetLoaded()
        }

        var b = this;
        this.loadCount = this.assetURLs.length;
        for (var c = 0; c < this.assetURLs.length; c++) {
            var d = this.assetURLs[c], e = this._getDataType(d);
            e || (e = d.split("?").shift().split(".").pop().toLowerCase());
            var f = this.loadersByType[e];
            if (!f) throw new Error(e + " is an unsupported file type");
            var g = new f(d, this.crossorigin);
            g.addEventListener("loaded", a), g.load()
        }
    }, e.AssetLoader.prototype.onAssetLoaded = function () {
        this.loadCount--, this.dispatchEvent({
            type: "onProgress",
            content: this
        }), this.onProgress && this.onProgress(), this.loadCount || (this.dispatchEvent({
            type: "onComplete",
            content: this
        }), this.onComplete && this.onComplete())
    }, e.JsonLoader = function (a, b) {
        e.EventTarget.call(this), this.url = a, this.crossorigin = b, this.baseUrl = a.replace(/[^\/]*$/, ""), this.loaded = !1
    }, e.JsonLoader.prototype.constructor = e.JsonLoader, e.JsonLoader.prototype.load = function () {
        this.ajaxRequest = new e.AjaxRequest;
        var a = this;
        this.ajaxRequest.onreadystatechange = function () {
            a.onJSONLoaded()
        }, this.ajaxRequest.open("GET", this.url, !0), this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/json"), this.ajaxRequest.send(null)
    }, e.JsonLoader.prototype.onJSONLoaded = function () {
        if (4 === this.ajaxRequest.readyState) if (200 === this.ajaxRequest.status || -1 === window.location.protocol.indexOf("http")) if (this.json = JSON.parse(this.ajaxRequest.responseText), this.json.frames) {
            var a = this, b = this.baseUrl + this.json.meta.image, c = new e.ImageLoader(b, this.crossorigin),
                d = this.json.frames;
            this.texture = c.texture.baseTexture, c.addEventListener("loaded", function () {
                a.onLoaded()
            });
            for (var f in d) {
                var g = d[f].frame;
                if (g && (e.TextureCache[f] = new e.Texture(this.texture, {
                    x: g.x,
                    y: g.y,
                    width: g.w,
                    height: g.h
                }), d[f].trimmed)) {
                    var h = e.TextureCache[f];
                    h.trimmed = !0;
                    var i = d[f].sourceSize, k = d[f].spriteSourceSize;
                    h.trim.x = k.x, h.trim.y = k.y, h.trim.realWidth = i.w, h.trim.realHeight = i.h
                }
            }
            c.load()
        } else if (this.json.bones) {
            var l = new j.SkeletonJson, m = l.readSkeletonData(this.json);
            e.AnimCache[this.url] = m, this.onLoaded()
        } else this.onLoaded(); else this.onError()
    },e.JsonLoader.prototype.onLoaded = function () {
        this.loaded = !0, this.dispatchEvent({type: "loaded", content: this})
    },e.JsonLoader.prototype.onError = function () {
        this.dispatchEvent({type: "error", content: this})
    },e.AtlasLoader = function (a, b) {
        e.EventTarget.call(this), this.url = a, this.baseUrl = a.replace(/[^\/]*$/, ""), this.crossorigin = b, this.loaded = !1
    },e.AtlasLoader.constructor = e.AtlasLoader,e.AtlasLoader.prototype.load = function () {
        this.ajaxRequest = new e.AjaxRequest, this.ajaxRequest.onreadystatechange = this.onAtlasLoaded.bind(this), this.ajaxRequest.open("GET", this.url, !0), this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/json"), this.ajaxRequest.send(null)
    },e.AtlasLoader.prototype.onAtlasLoaded = function () {
        if (4 === this.ajaxRequest.readyState) if (200 === this.ajaxRequest.status || -1 === window.location.href.indexOf("http")) {
            this.atlas = {meta: {image: []}, frames: []};
            var a = this.ajaxRequest.responseText.split(/\r?\n/), b = -3, c = 0, d = null, f = !1, g = 0, h = 0,
                i = this.onLoaded.bind(this);
            for (g = 0; g < a.length; g++) if (a[g] = a[g].replace(/^\s+|\s+$/g, ""), "" === a[g] && (f = g + 1), a[g].length > 0) {
                if (f === g) this.atlas.meta.image.push(a[g]), c = this.atlas.meta.image.length - 1, this.atlas.frames.push({}), b = -3; else if (b > 0) if (b % 7 === 1) null != d && (this.atlas.frames[c][d.name] = d), d = {
                    name: a[g],
                    frame: {}
                }; else {
                    var j = a[g].split(" ");
                    if (b % 7 === 3) d.frame.x = Number(j[1].replace(",", "")), d.frame.y = Number(j[2]); else if (b % 7 === 4) d.frame.w = Number(j[1].replace(",", "")), d.frame.h = Number(j[2]); else if (b % 7 === 5) {
                        var k = {x: 0, y: 0, w: Number(j[1].replace(",", "")), h: Number(j[2])};
                        k.w > d.frame.w || k.h > d.frame.h ? (d.trimmed = !0, d.realSize = k) : d.trimmed = !1
                    }
                }
                b++
            }
            if (null != d && (this.atlas.frames[c][d.name] = d), this.atlas.meta.image.length > 0) {
                for (this.images = [], h = 0; h < this.atlas.meta.image.length; h++) {
                    var l = this.baseUrl + this.atlas.meta.image[h], m = this.atlas.frames[h];
                    this.images.push(new e.ImageLoader(l, this.crossorigin));
                    for (g in m) {
                        var n = m[g].frame;
                        n && (e.TextureCache[g] = new e.Texture(this.images[h].texture.baseTexture, {
                            x: n.x,
                            y: n.y,
                            width: n.w,
                            height: n.h
                        }), m[g].trimmed && (e.TextureCache[g].realSize = m[g].realSize, e.TextureCache[g].trim.x = 0, e.TextureCache[g].trim.y = 0))
                    }
                }
                for (this.currentImageId = 0, h = 0; h < this.images.length; h++) this.images[h].addEventListener("loaded", i);
                this.images[this.currentImageId].load()
            } else this.onLoaded()
        } else this.onError()
    },e.AtlasLoader.prototype.onLoaded = function () {
        this.images.length - 1 > this.currentImageId ? (this.currentImageId++, this.images[this.currentImageId].load()) : (this.loaded = !0, this.dispatchEvent({
            type: "loaded",
            content: this
        }))
    },e.AtlasLoader.prototype.onError = function () {
        this.dispatchEvent({type: "error", content: this})
    },e.SpriteSheetLoader = function (a, b) {
        e.EventTarget.call(this), this.url = a, this.crossorigin = b, this.baseUrl = a.replace(/[^\/]*$/, ""), this.texture = null, this.frames = {}
    },e.SpriteSheetLoader.prototype.constructor = e.SpriteSheetLoader,e.SpriteSheetLoader.prototype.load = function () {
        var a = this, b = new e.JsonLoader(this.url, this.crossorigin);
        b.addEventListener("loaded", function (b) {
            a.json = b.content.json, a.onLoaded()
        }), b.load()
    },e.SpriteSheetLoader.prototype.onLoaded = function () {
        this.dispatchEvent({type: "loaded", content: this})
    },e.ImageLoader = function (a, b) {
        e.EventTarget.call(this), this.texture = e.Texture.fromImage(a, b), this.frames = []
    },e.ImageLoader.prototype.constructor = e.ImageLoader,e.ImageLoader.prototype.load = function () {
        if (this.texture.baseTexture.hasLoaded) this.onLoaded(); else {
            var a = this;
            this.texture.baseTexture.addEventListener("loaded", function () {
                a.onLoaded()
            })
        }
    },e.ImageLoader.prototype.onLoaded = function () {
        this.dispatchEvent({type: "loaded", content: this})
    },e.ImageLoader.prototype.loadFramedSpriteSheet = function (a, b, c) {
        this.frames = [];
        for (var d = Math.floor(this.texture.width / a), f = Math.floor(this.texture.height / b), g = 0, h = 0; f > h; h++) for (var i = 0; d > i; i++, g++) {
            var j = new e.Texture(this.texture, {x: i * a, y: h * b, width: a, height: b});
            this.frames.push(j), c && (e.TextureCache[c + "-" + g] = j)
        }
        if (this.texture.baseTexture.hasLoaded) this.onLoaded(); else {
            var k = this;
            this.texture.baseTexture.addEventListener("loaded", function () {
                k.onLoaded()
            })
        }
    },e.BitmapFontLoader = function (a, b) {
        e.EventTarget.call(this), this.url = a, this.crossorigin = b, this.baseUrl = a.replace(/[^\/]*$/, ""), this.texture = null
    },e.BitmapFontLoader.prototype.constructor = e.BitmapFontLoader,e.BitmapFontLoader.prototype.load = function () {
        this.ajaxRequest = new XMLHttpRequest;
        var a = this;
        this.ajaxRequest.onreadystatechange = function () {
            a.onXMLLoaded()
        }, this.ajaxRequest.open("GET", this.url, !0), this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/xml"), this.ajaxRequest.send(null)
    },e.BitmapFontLoader.prototype.onXMLLoaded = function () {
        if (4 === this.ajaxRequest.readyState && (200 === this.ajaxRequest.status || -1 === window.location.protocol.indexOf("http"))) {
            var a = this.baseUrl + this.ajaxRequest.responseXML.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue,
                b = new e.ImageLoader(a, this.crossorigin);
            this.texture = b.texture.baseTexture;
            var c = {}, d = this.ajaxRequest.responseXML.getElementsByTagName("info")[0],
                f = this.ajaxRequest.responseXML.getElementsByTagName("common")[0];
            c.font = d.attributes.getNamedItem("face").nodeValue, c.size = parseInt(d.attributes.getNamedItem("size").nodeValue, 10), c.lineHeight = parseInt(f.attributes.getNamedItem("lineHeight").nodeValue, 10), c.chars = {};
            for (var g = this.ajaxRequest.responseXML.getElementsByTagName("char"), h = 0; h < g.length; h++) {
                var i = parseInt(g[h].attributes.getNamedItem("id").nodeValue, 10),
                    j = new e.Rectangle(parseInt(g[h].attributes.getNamedItem("x").nodeValue, 10), parseInt(g[h].attributes.getNamedItem("y").nodeValue, 10), parseInt(g[h].attributes.getNamedItem("width").nodeValue, 10), parseInt(g[h].attributes.getNamedItem("height").nodeValue, 10));
                c.chars[i] = {
                    xOffset: parseInt(g[h].attributes.getNamedItem("xoffset").nodeValue, 10),
                    yOffset: parseInt(g[h].attributes.getNamedItem("yoffset").nodeValue, 10),
                    xAdvance: parseInt(g[h].attributes.getNamedItem("xadvance").nodeValue, 10),
                    kerning: {},
                    texture: e.TextureCache[i] = new e.Texture(this.texture, j)
                }
            }
            var k = this.ajaxRequest.responseXML.getElementsByTagName("kerning");
            for (h = 0; h < k.length; h++) {
                var l = parseInt(k[h].attributes.getNamedItem("first").nodeValue, 10),
                    m = parseInt(k[h].attributes.getNamedItem("second").nodeValue, 10),
                    n = parseInt(k[h].attributes.getNamedItem("amount").nodeValue, 10);
                c.chars[m].kerning[l] = n
            }
            e.BitmapText.fonts[c.font] = c;
            var o = this;
            b.addEventListener("loaded", function () {
                o.onLoaded()
            }), b.load()
        }
    },e.BitmapFontLoader.prototype.onLoaded = function () {
        this.dispatchEvent({type: "loaded", content: this})
    },e.SpineLoader = function (a, b) {
        e.EventTarget.call(this), this.url = a, this.crossorigin = b, this.loaded = !1
    },e.SpineLoader.prototype.constructor = e.SpineLoader,e.SpineLoader.prototype.load = function () {
        var a = this, b = new e.JsonLoader(this.url, this.crossorigin);
        b.addEventListener("loaded", function (b) {
            a.json = b.content.json, a.onLoaded()
        }), b.load()
    },e.SpineLoader.prototype.onLoaded = function () {
        this.loaded = !0, this.dispatchEvent({type: "loaded", content: this})
    },e.AbstractFilter = function (a, b) {
        this.passes = [this], this.shaders = [], this.dirty = !0, this.padding = 0, this.uniforms = b || {}, this.fragmentSrc = a || []
    },e.AlphaMaskFilter = function (a) {
        e.AbstractFilter.call(this), this.passes = [this], a.baseTexture._powerOf2 = !0, this.uniforms = {
            mask: {
                type: "sampler2D",
                value: a
            }, mapDimensions: {type: "2f", value: {x: 1, y: 5112}}, dimensions: {type: "4fv", value: [0, 0, 0, 0]}
        }, a.baseTexture.hasLoaded ? (this.uniforms.mask.value.x = a.width, this.uniforms.mask.value.y = a.height) : (this.boundLoadedFunction = this.onTextureLoaded.bind(this), a.baseTexture.on("loaded", this.boundLoadedFunction)), this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D mask;", "uniform sampler2D uSampler;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   mapCords *= dimensions.xy / mapDimensions;", "   vec4 original =  texture2D(uSampler, vTextureCoord);", "   float maskAlpha =  texture2D(mask, mapCords).r;", "   original *= maskAlpha;", "   gl_FragColor =  original;", "}"]
    },e.AlphaMaskFilter.prototype = Object.create(e.AbstractFilter.prototype),e.AlphaMaskFilter.prototype.constructor = e.AlphaMaskFilter,e.AlphaMaskFilter.prototype.onTextureLoaded = function () {
        this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width, this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height, this.uniforms.mask.value.baseTexture.off("loaded", this.boundLoadedFunction)
    },Object.defineProperty(e.AlphaMaskFilter.prototype, "map", {
        get: function () {
            return this.uniforms.mask.value
        }, set: function (a) {
            this.uniforms.mask.value = a
        }
    }),e.ColorMatrixFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            matrix: {
                type: "mat4",
                value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform mat4 matrix;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;", "}"]
    },e.ColorMatrixFilter.prototype = Object.create(e.AbstractFilter.prototype),e.ColorMatrixFilter.prototype.constructor = e.ColorMatrixFilter,Object.defineProperty(e.ColorMatrixFilter.prototype, "matrix", {
        get: function () {
            return this.uniforms.matrix.value
        }, set: function (a) {
            this.uniforms.matrix.value = a
        }
    }),e.GrayFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            gray: {
                type: "1f",
                value: 1
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float gray;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);", "}"]
    },e.GrayFilter.prototype = Object.create(e.AbstractFilter.prototype),e.GrayFilter.prototype.constructor = e.GrayFilter,Object.defineProperty(e.GrayFilter.prototype, "gray", {
        get: function () {
            return this.uniforms.gray.value
        }, set: function (a) {
            this.uniforms.gray.value = a
        }
    }),e.DisplacementFilter = function (a) {
        e.AbstractFilter.call(this), this.passes = [this], a.baseTexture._powerOf2 = !0, this.uniforms = {
            displacementMap: {
                type: "sampler2D",
                value: a
            },
            scale: {type: "2f", value: {x: 30, y: 30}},
            offset: {type: "2f", value: {x: 0, y: 0}},
            mapDimensions: {type: "2f", value: {x: 1, y: 5112}},
            dimensions: {type: "4fv", value: [0, 0, 0, 0]}
        }, a.baseTexture.hasLoaded ? (this.uniforms.mapDimensions.value.x = a.width, this.uniforms.mapDimensions.value.y = a.height) : (this.boundLoadedFunction = this.onTextureLoaded.bind(this), a.baseTexture.on("loaded", this.boundLoadedFunction)), this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D displacementMap;", "uniform sampler2D uSampler;", "uniform vec2 scale;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   vec2 matSample = texture2D(displacementMap, mapCords).xy;", "   matSample -= 0.5;", "   matSample *= scale;", "   matSample /= mapDimensions;", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);", "   vec2 cord = vTextureCoord;", "}"]
    },e.DisplacementFilter.prototype = Object.create(e.AbstractFilter.prototype),e.DisplacementFilter.prototype.constructor = e.DisplacementFilter,e.DisplacementFilter.prototype.onTextureLoaded = function () {
        this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width, this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height, this.uniforms.displacementMap.value.baseTexture.off("loaded", this.boundLoadedFunction)
    },Object.defineProperty(e.DisplacementFilter.prototype, "map", {
        get: function () {
            return this.uniforms.displacementMap.value
        }, set: function (a) {
            this.uniforms.displacementMap.value = a
        }
    }),Object.defineProperty(e.DisplacementFilter.prototype, "scale", {
        get: function () {
            return this.uniforms.scale.value
        }, set: function (a) {
            this.uniforms.scale.value = a
        }
    }),Object.defineProperty(e.DisplacementFilter.prototype, "offset", {
        get: function () {
            return this.uniforms.offset.value
        }, set: function (a) {
            this.uniforms.offset.value = a
        }
    }),e.PixelateFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            invert: {type: "1f", value: 0},
            dimensions: {type: "4fv", value: new Float32Array([1e4, 100, 10, 10])},
            pixelSize: {type: "2f", value: {x: 10, y: 10}}
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 testDim;", "uniform vec4 dimensions;", "uniform vec2 pixelSize;", "uniform sampler2D uSampler;", "void main(void) {", "   vec2 coord = vTextureCoord;", "   vec2 size = dimensions.xy/pixelSize;", "   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;", "   gl_FragColor = texture2D(uSampler, color);", "}"]
    },e.PixelateFilter.prototype = Object.create(e.AbstractFilter.prototype),e.PixelateFilter.prototype.constructor = e.PixelateFilter,Object.defineProperty(e.PixelateFilter.prototype, "size", {
        get: function () {
            return this.uniforms.pixelSize.value
        }, set: function (a) {
            this.dirty = !0, this.uniforms.pixelSize.value = a
        }
    }),e.BlurXFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;", "   gl_FragColor = sum;", "}"]
    },e.BlurXFilter.prototype = Object.create(e.AbstractFilter.prototype),e.BlurXFilter.prototype.constructor = e.BlurXFilter,Object.defineProperty(e.BlurXFilter.prototype, "blur", {
        get: function () {
            return this.uniforms.blur.value / (1 / 7e3)
        }, set: function (a) {
            this.dirty = !0, this.uniforms.blur.value = 1 / 7e3 * a
        }
    }),e.BlurYFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;", "   gl_FragColor = sum;", "}"]
    },e.BlurYFilter.prototype = Object.create(e.AbstractFilter.prototype),e.BlurYFilter.prototype.constructor = e.BlurYFilter,Object.defineProperty(e.BlurYFilter.prototype, "blur", {
        get: function () {
            return this.uniforms.blur.value / (1 / 7e3)
        }, set: function (a) {
            this.uniforms.blur.value = 1 / 7e3 * a
        }
    }),e.BlurFilter = function () {
        this.blurXFilter = new e.BlurXFilter, this.blurYFilter = new e.BlurYFilter, this.passes = [this.blurXFilter, this.blurYFilter]
    },Object.defineProperty(e.BlurFilter.prototype, "blur", {
        get: function () {
            return this.blurXFilter.blur
        }, set: function (a) {
            this.blurXFilter.blur = this.blurYFilter.blur = a
        }
    }),Object.defineProperty(e.BlurFilter.prototype, "blurX", {
        get: function () {
            return this.blurXFilter.blur
        }, set: function (a) {
            this.blurXFilter.blur = a
        }
    }),Object.defineProperty(e.BlurFilter.prototype, "blurY", {
        get: function () {
            return this.blurYFilter.blur
        }, set: function (a) {
            this.blurYFilter.blur = a
        }
    }),e.InvertFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            invert: {
                type: "1f",
                value: 1
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);", "}"]
    },e.InvertFilter.prototype = Object.create(e.AbstractFilter.prototype),e.InvertFilter.prototype.constructor = e.InvertFilter,Object.defineProperty(e.InvertFilter.prototype, "invert", {
        get: function () {
            return this.uniforms.invert.value
        }, set: function (a) {
            this.uniforms.invert.value = a
        }
    }),e.SepiaFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            sepia: {
                type: "1f",
                value: 1
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float sepia;", "uniform sampler2D uSampler;", "const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);", "}"]
    },e.SepiaFilter.prototype = Object.create(e.AbstractFilter.prototype),e.SepiaFilter.prototype.constructor = e.SepiaFilter,Object.defineProperty(e.SepiaFilter.prototype, "sepia", {
        get: function () {
            return this.uniforms.sepia.value
        }, set: function (a) {
            this.uniforms.sepia.value = a
        }
    }),e.TwistFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            radius: {type: "1f", value: .5},
            angle: {type: "1f", value: 5},
            offset: {type: "2f", value: {x: .5, y: .5}}
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float radius;", "uniform float angle;", "uniform vec2 offset;", "void main(void) {", "   vec2 coord = vTextureCoord - offset;", "   float distance = length(coord);", "   if (distance < radius) {", "       float ratio = (radius - distance) / radius;", "       float angleMod = ratio * ratio * angle;", "       float s = sin(angleMod);", "       float c = cos(angleMod);", "       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);", "   }", "   gl_FragColor = texture2D(uSampler, coord+offset);", "}"]
    },e.TwistFilter.prototype = Object.create(e.AbstractFilter.prototype),e.TwistFilter.prototype.constructor = e.TwistFilter,Object.defineProperty(e.TwistFilter.prototype, "offset", {
        get: function () {
            return this.uniforms.offset.value
        }, set: function (a) {
            this.dirty = !0, this.uniforms.offset.value = a
        }
    }),Object.defineProperty(e.TwistFilter.prototype, "radius", {
        get: function () {
            return this.uniforms.radius.value
        }, set: function (a) {
            this.dirty = !0, this.uniforms.radius.value = a
        }
    }),Object.defineProperty(e.TwistFilter.prototype, "angle", {
        get: function () {
            return this.uniforms.angle.value
        }, set: function (a) {
            this.dirty = !0, this.uniforms.angle.value = a
        }
    }),e.ColorStepFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            step: {
                type: "1f",
                value: 5
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float step;", "void main(void) {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   color = floor(color * step) / step;", "   gl_FragColor = color;", "}"]
    },e.ColorStepFilter.prototype = Object.create(e.AbstractFilter.prototype),e.ColorStepFilter.prototype.constructor = e.ColorStepFilter,Object.defineProperty(e.ColorStepFilter.prototype, "step", {
        get: function () {
            return this.uniforms.step.value
        }, set: function (a) {
            this.uniforms.step.value = a
        }
    }),e.DotScreenFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            scale: {type: "1f", value: 1},
            angle: {type: "1f", value: 5},
            dimensions: {type: "4fv", value: [0, 0, 0, 0]}
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float angle;", "uniform float scale;", "float pattern() {", "   float s = sin(angle), c = cos(angle);", "   vec2 tex = vTextureCoord * dimensions.xy;", "   vec2 point = vec2(", "       c * tex.x - s * tex.y,", "       s * tex.x + c * tex.y", "   ) * scale;", "   return (sin(point.x) * sin(point.y)) * 4.0;", "}", "void main() {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   float average = (color.r + color.g + color.b) / 3.0;", "   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);", "}"]
    },e.DotScreenFilter.prototype = Object.create(e.DotScreenFilter.prototype),e.DotScreenFilter.prototype.constructor = e.DotScreenFilter,Object.defineProperty(e.DotScreenFilter.prototype, "scale", {
        get: function () {
            return this.uniforms.scale.value
        }, set: function (a) {
            this.dirty = !0, this.uniforms.scale.value = a
        }
    }),Object.defineProperty(e.DotScreenFilter.prototype, "angle", {
        get: function () {
            return this.uniforms.angle.value
        }, set: function (a) {
            this.dirty = !0, this.uniforms.angle.value = a
        }
    }),e.CrossHatchFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);", "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);", "    if (lum < 1.00) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.75) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.50) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.3) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "}"]
    },e.CrossHatchFilter.prototype = Object.create(e.AbstractFilter.prototype),e.CrossHatchFilter.prototype.constructor = e.BlurYFilter,Object.defineProperty(e.CrossHatchFilter.prototype, "blur", {
        get: function () {
            return this.uniforms.blur.value / (1 / 7e3)
        }, set: function (a) {
            this.uniforms.blur.value = 1 / 7e3 * a
        }
    }),e.RGBSplitFilter = function () {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            red: {type: "2f", value: {x: 20, y: 20}},
            green: {type: "2f", value: {x: -20, y: 20}},
            blue: {type: "2f", value: {x: 20, y: -20}},
            dimensions: {type: "4fv", value: [0, 0, 0, 0]}
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 red;", "uniform vec2 green;", "uniform vec2 blue;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;", "   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;", "   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;", "   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;", "}"]
    },e.RGBSplitFilter.prototype = Object.create(e.AbstractFilter.prototype),e.RGBSplitFilter.prototype.constructor = e.RGBSplitFilter,Object.defineProperty(e.RGBSplitFilter.prototype, "angle", {
        get: function () {
            return this.uniforms.blur.value / (1 / 7e3)
        }, set: function (a) {
            this.uniforms.blur.value = 1 / 7e3 * a
        }
    }),"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = e), exports.PIXI = e) : "undefined" != typeof define && define.amd ? define(e) : d.PIXI = e
}).call(this);