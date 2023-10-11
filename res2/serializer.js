class Type {
    static node = 0;
    static scene = 1;
    static camera = 2;
    static sprite = 3;
    static label = 4;
    static action = 5;
    static Sequence = 6;
    static DelayTime = 7;
    static RotateTo = 8;
    static CallFunc = 9;
    static end = 0x12357;
}

const ActionManager = class {
    actions;

    constructor() {
        this.actions = new Array(2);
        console.log("[AM] done");
    }

    update(count) {
        this.actions.forEach((a) => {
            switch (a.type) {
                case Type.RotateTo:
                    if (a.start === -1) {
                        a.start = count;
                    }
                    if (count < a.start + a.duration * 60) {
                        a.node.rotation = (count - a.start) * 3.1415927 * (a.ax - 360) / (a.duration * 60 * 180);
                    } else {
                        a.node.rotation = 3.1415927 * a.ax / 180;
                    }
                    break;
                default:
            }
        });
    }
}

const Serializer = class {
    constructor() {
        this.base = null;
        this.base_ = null;
        this.i = 0;
        this.action_manager = new ActionManager();
    }

    async load_data(data) {
        // noinspection JSCheckFunctionSignatures
        this.base = new Uint8Array(data);
        console.log(this.base);
        this.base_ = new DataView(this.base.buffer);
        console.log(this.base_);
        this.i = 0;
        // this.clearScene();
        stage.children = [];
        this.m_in = new Array(1024);
        this.loadScene();
    }

    async load_file(filename) {
        console.log("[load] filename: " + filename + "  isSecureContext: " + window.isSecureContext);
        let blob = await fetch(filename).then(r => r.blob());
        let reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        let loader = this;
        reader.onload = function () {
            console.log("[load] onload:");
            console.log(this);
            console.log(reader.result);
            // noinspection JSCheckFunctionSignatures
            loader.base = new Uint8Array(reader.result);
            console.log(loader.base);
            loader.base_ = new DataView(loader.base.buffer);
            console.log(loader.base_);
            loader.i = 0;
            loader.m_in = new Array(1024);
            buffer.loadScene();
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
        reader.onloadend = function () {
            console.log("[load] onloadend");
        }
    }

    read_int64() {
        let r = this.base_.getBigInt64(this.i, true);
        this.i += 8;
        return r;
    }

    get_int() {
        return this.base_.getInt32(this.i, true);
    }

    read_int() {
        let r = this.base_.getInt32(this.i, true);
        this.i += 4;
        return r;
    }

    read_float() {
        let r = this.base_.getFloat32(this.i, true);
        this.i += 4;
        return r;
    }

    read_bool() {
        let r = this.base_.getInt8(this.i);
        this.i += 1;
        return r;
    }

    read_string() {
        let size = this.read_int();
        let enc = new TextDecoder("utf-8");
        let r = enc.decode(this.base.subarray(this.i, this.i + size - 1));
        console.log(r);
        this.i += size;
        return r;
    }

    readNode(name) {
        console.log("[D] getNode: " + name + "   i: " + this.i);
        if (this.get_int() === 0) {
            this.read_int();
            return null;
        }
        let n = this.read_int();
        console.log("[D] n: " + n + "(" + n.toString(16) + ")");
        if (n !== -1) {
            console.log("[D] found: " + n);
            return this.m_in[n];
        } else {
            n = this.read_int();
            let t = this.read_int();
            console.log("[D] t: " + t);
            let new_node;
            switch (t) {
                case Type.node:
                    new_node = this.deserialize_node();
                    console.log("[D] Node: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.scene:
                    new_node = this.deserialize_scene();
                    console.log("[D] Scene: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.camera:
                    new_node = this.deserialize_camera();
                    console.log("[D] Camera: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.sprite:
                    new_node = this.deserialize_sprite();
                    console.log("[D] Sprite: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.label:
                    new_node = this.deserialize_label();
                    console.log("[D] Label: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                default:
                    new_node = null;
            }
            this.m_in[n] = new_node;
            if (this.read_int() === Type.end) {
                console.log("[-] End of " + name + " [" + new_node + "](" + n + ")");
            } else {
                console.log("[Error] " + name + " [" + new_node + "](" + n + ")");
            }
            return new_node;
        }
    }

    deserialize_node() {
        console.log("[D] deserialize_node");
        let _rotationX = this.read_float();
        let _rotationY = this.read_float();
        let _rotationZ_X = this.read_float();
        let _rotationZ_Y = this.read_float();
        let _scaleX = this.read_float();
        let _scaleY = this.read_float();
        let _scaleZ = this.read_float();
        let _position_x = this.read_float();
        let _position_y = this.read_float();
        let _positionZ = this.read_float();
        let _usingNormalizedPosition = this.read_bool();
        let _normalizedPositionDirty = this.read_bool();
        let _skewX = this.read_float();
        let _skewY = this.read_float();
        let _contentSizeDirty = this.read_bool();
        let _transformDirty = this.read_bool();
        let _inverseDirty = this.read_bool();
        let _transformUpdated = this.read_bool();
        let _localZOrder$Arrival = this.read_int64();
        let _globalZOrder = this.read_float();
        let s_globalOrderOfArrival = this.read_int();
        //-<<< children >>>-
        let size = this.read_int();
        console.log("[D] children_size: " + size + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            this.readNode("node" + i);
        }
        let _parent = this.readNode("parent");
        let _tag = this.read_int();
        let _hashOfName = this.read_int64();
        return {x: _position_x, y: _position_y};
    }

    deserialize_scene() {
        console.log("[D] deserialize_scene");
        this.deserialize_node();
        this.read_int64();
        let _defaultCamera = this.readNode("defaultCamera");
        let _cameraOrderDirty = this.read_bool();
        this.read_int64();
        let _physics3dDebugCamera = this.readNode("physics3dDebugCamera");
        let _navMeshDebugCamera = this.readNode("navMeshDebugCamera");
        return "scene";
    }

    deserialize_camera() {
        return "camera";
    }

    deserialize_sprite() {
        let node = this.deserialize_node();
        let name = this.read_string();
        let sprite = PIXI.Sprite.from(name);
        stage.addChild(sprite);
        sprite.position.x = node.x;
        sprite.position.y = node.y;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        return sprite;
    }

    deserialize_label() {
        let node = this.deserialize_node();
        let mes = this.read_string();
        let font = this.read_string();
        let size = this.read_float();
        let text = new PIXI.Text(mes, {fontFamily: font, fontSize: size, fill: 0xffffff, align: 'center'});
        text.position.x = node.x;
        text.position.y = _h - node.y;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        stage.addChild(text);
        return text;
    }

    readAction(node) {
        let t = this.read_int();
        let a;
        switch (t) {
            case Type.action:
                console.log("[D] Action: [" + node + "]");
                a = null;
                break;
            case Type.Sequence:
                console.log("[D] Sequence: [" + node + "]");
                this.readAction(node);
                this.readAction(node);
                a = null;
                break;
            case Type.RotateTo:
                console.log("[D] RotateTo: [" + node + "]");
                let _duration = this.read_float();
                let _dstAngle_x = this.read_float();
                let _dstAngle_y = this.read_float();
                a = {node: node, type: Type.RotateTo, duration: _duration, ax: _dstAngle_x, ay: _dstAngle_y, start: -1};
                console.log(a);
                this.action_manager.actions.push(a);
                break;
            default:
                a = null;
        }
        return a;
    }

    readActionManager() {
        let size = this.read_int();
        console.log("[D] actions_size: " + size + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            let node = this.readNode("target" + i);
            let s = this.read_int();
            console.log("[D] [" + node + "] actions size: " + s);
            for (let j = 0; j < s; ++j) {
                this.readAction(node);
            }
        }
    }

    loadScene() {
        this.readNode("main_scene");
        this.readActionManager();
        console.log(this.m_in);
    }

    clearScene() {
        // stage.children = [];
        // stage.children.forEach((c) => { });
    }
}