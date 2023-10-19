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
    static ProtectedNode = 10;
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

    readNode(name, parent) {
        console.log("[D] getNode parent: " + parent._name + " L:" + parent._level + " node: " + name + "   i: " + this.i);
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
                    new_node = this.deserialize_node(parent);
                    console.log("[D] Node: " + name + " [" + new_node + "](" + n + " - new)");
                    parent.addChild(new_node);
                    break;
                case Type.scene:
                    new_node = this.deserialize_scene(parent);
                    console.log("[D] Scene: " + name + " [" + new_node + "](" + n + " - new)");
                    parent.addChild(new_node);
                    break;
                case Type.camera:
                    new_node = {_name: "camera", _level: 0};
                    console.log("[D] Camera: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.sprite:
                    new_node = this.deserialize_sprite(parent);
                    console.log("[D] Sprite: " + name + " [" + new_node._name + "](" + n + " - new) parent:");
                    console.log(parent);
                    // stage.addChild(new_node);
                    parent.addChild(new_node);

                    // let sprite1 = PIXI.Sprite.from("res/" + "HelloWorld.png");
                    // sprite1.position.x = 3 * _w / 4;
                    // sprite1.position.y = _h / 2;
                    // sprite1.anchor.x = 0.5;
                    // sprite1.anchor.y = 0.5;
                    // sprite1._name = "sprite test";
                    // stage.addChild(sprite1);
                    // parent.addChild(sprite1);

                    break;
                case Type.label:
                    new_node = this.deserialize_label();
                    console.log("[D] Label: " + name + " [" + new_node + "](" + n + " - new)");
                    parent.addChild(new_node);
                    break;
                case Type.ProtectedNode:
                    new_node = this.deserialize_ProtectedNode() + " " + n;
                    console.log("[D] ProtectedNode: " + name + " [" + new_node + "](" + n + " - new)");
                    parent.addChild(new_node);
                    break;
                default:
                    new_node = null;
            }
            if (new_node !== null) {
                new_node._level = parent._level + 1;
                console.log("[STAGE] parent: " + parent._name + " L:" + parent._level);
                console.log("[STAGE] child: " + new_node._name + " L:" + new_node._level);
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

    deserialize_node(parent) {
        let node = new PIXI.Container();
        node._level = parent._level + 1;
        if (parent._level >= 0) {
            parent.addChild(node);
        }
        console.log("[D] deserialize_node");
        node._rotationX = this.read_float();
        node._rotationY = this.read_float();
        node._rotationZ_X = this.read_float();
        node._rotationZ_Y = this.read_float();
        node._scaleX = this.read_float();
        node._scaleY = this.read_float();
        node._scaleZ = this.read_float();
        node.position.x = this.read_float();
        node.position.y = this.read_float();
        node._positionZ = this.read_float();
        node._usingNormalizedPosition = this.read_bool();
        node._normalizedPositionDirty = this.read_bool();
        node._skewX = this.read_float();
        node._skewY = this.read_float();
        node._contentSizeDirty = this.read_bool();
        node._transformDirty = this.read_bool();
        node._inverseDirty = this.read_bool();
        node._transformUpdated = this.read_bool();
        node._localZOrder$Arrival = this.read_int64();
        node._globalZOrder = this.read_float();
        node.s_globalOrderOfArrival = this.read_int();
        //-<<< children >>>-
        let size = this.read_int();
        console.log("[D] children_size: " + size + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            node._name = parent._name + "_node" + i;
            this.readNode(node._name, parent);
        }
        node._parent = this.readNode("parent", node);
        node._tag = this.read_int();
        node._hashOfName = this.read_int64();
        // node.position.x = node._position_x;
        // node.position.y = _h - node._position_y;
        // node.position.x = 0;
        // node.position.y = 0;
        node.width = 512;
        node.height = 512;
        console.log("NEW Container x: " + node.position.x + "  y: " + node.position.y);

        // let container = new PIXI.Container();
        // container.width = 512;
        // container.height = 512;
        // container.position.x = 0;
        // container.position.y = 0;
        // container._position_x = container.position.x;
        // container._position_y = container.position.y;
        // stage.addChild(container);

        return node;
    }

    deserialize_ProtectedNode() {
        let node = this.deserialize_node({_level: -1});
        console.log("[D] deserialize_ProtectedNode");
        //-<<< children >>>-
        let size = this.read_int();
        console.log("[D] children_size: " + size + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            this.readNode("_node" + i, node);
        }
        return "ProtectedNode";
    }

    deserialize_scene(parent) {
        console.log("[D] deserialize_scene");
        let node = this.deserialize_node(parent);
        node._name = "scene";
        this.read_int64();
        node._defaultCamera = this.readNode("defaultCamera", node);
        node._cameraOrderDirty = this.read_bool();
        this.read_int64();
        node._physics3dDebugCamera = this.readNode("physics3dDebugCamera", node);
        node._navMeshDebugCamera = this.readNode("navMeshDebugCamera", node);
        node.width = 512;
        node.height = 512;
        node.position.x = 0;
        node.position.y = 0;

        // let text1 = new PIXI.Text("text2", {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'});
        // text1.position.x = _w / 2;
        // text1.position.y = _h / 8;
        // text1.anchor.x = 0.5;
        // text1.anchor.y = 0.5;
        // node.addChild(text1);

        return node;
    }

    deserialize_sprite() {
        let node = this.deserialize_node({_level: -10});
        let name = this.read_string();
        let sprite = PIXI.Sprite.from("res/" + name);
        sprite.position.x = node.position.x;
        sprite.position.y = _h - node.position.y;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite._name = "deserialized sprite";
        return sprite;
    }

    deserialize_label() {
        let node = this.deserialize_node({_level: -1});
        let mes = this.read_string();
        let font = this.read_string();
        let size = this.read_float();
        let text = new PIXI.Text(mes, {fontFamily: font, fontSize: size, fill: 0xffffff, align: 'center'});
        text.position.x = node.position.x;
        text.position.y = _h - node.position.y;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        console.log("[Label] x:" + text.position.x + " y:" + text.position.y + " " + mes);
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

    readActionManager(parent) {
        let size = this.read_int();
        console.log("[D] actions_size: " + size + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            let node = this.readNode("target" + i, parent);
            let s = this.read_int();
            console.log("[D] [" + node + "] actions size: " + s);
            for (let j = 0; j < s; ++j) {
                this.readAction(node);
            }
        }
    }

    loadScene() {
        // stage.children = [];
        document.body.removeChild(app.view);
        _w = this.read_float();// * scale;
        _h = this.read_float();// * scale;
        console.log("[D] w:" + _w);
        console.log("[D] h:" + _h);
        app = new PIXI.Application({width: _w * _scale, height: _h * _scale});
        // app.renderer.background.color = 0;
        document.body.appendChild(app.view);

        stage = app.stage;
        stage._level = 0;
        stage.scale.set(_scale, _scale);
        // stage.position.set(0, 128);

        let time = new PIXI.Text("---", {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'});
        time.position.x = _w / 2;
        time.position.y = _h / 16;
        time.anchor.x = 0.5;
        time.anchor.y = 0.5;
        stage.addChild(time);
        ask(time);
        stage._name = "main_scene";
        this.readNode("main_scene", stage);
        this.readActionManager(stage);
        console.log(stage);
        console.log(this.m_in);
//----------------------------------------------------------------------------------------------------------------------
//         let container = new PIXI.Container();
        // container.scale.set(0.5, 0.5);
        // container.width = 512;
        // container.height = 512;
        // container.position.x = 0;
        // container.position.y = 0;
        // container.alpha = 0.5;
        // container.rotation = 0.1;
        // stage.addChild(container);

        // let text1 = new PIXI.Text("text1", {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'});
        // text1.position.x = _w / 2;
        // text1.position.y = _h / 8;
        // text1.anchor.x = 0.5;
        // text1.anchor.y = 0.5;
        // container.addChild(text1);

        // let sprite1 = PIXI.Sprite.from("res/" + "HelloWorld.png");
        // // stage.addChild(sprite);
        // sprite1.position.x = _w / 4;
        // sprite1.position.y = _h / 2;
        // sprite1.anchor.x = 0.5;
        // sprite1.anchor.y = 0.5;
        // sprite1._name = "sprite";
        // container.addChild(sprite1);

    }
}