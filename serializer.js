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
    static Button = 11;
    static end = 0x12357;
}

let i_Container = 0;

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

let tab_level = ["", "\t", "\t\t", "\t\t\t", "\t\t\t\t", "\t\t\t\t\t", "\t\t\t\t\t\t", "\t\t\t\t\t\t\t"];

const Serializer = class {
    constructor() {
        this.base = null;
        this.base_ = null;
        this.i = 0;
        this.action_manager = new ActionManager();
    }

    load_data(data) {
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
        return r !== 0;
    }

    read_string() {
        let size = this.read_int();
        let enc = new TextDecoder("utf-8");
        let r = enc.decode(this.base.subarray(this.i, this.i + size - 1));
        console.log(r);
        this.i += size;
        return r;
    }

    check(node1, name1) {
        // let container1 = new PIXI.Container();
        // container1.scale.set(0.3, 0.3);
        // container1.width = 512;
        // container1.height = 512;
        // container1.position.x = 0;
        // container1.position.y = 100;
        // // container1.position.x = -node1.width;
        // // container1.position.y = -node1.height;
        // container1.alpha = 0.5;
        // container1.rotation = -0.2;
        // node1.addChild(container1);
        //
        // let sprite1 = PIXI.Sprite.from("res/" + "background/background.png");
        // sprite1.position.x = 0;
        // sprite1.position.y = 0;
        // sprite1.anchor.x = 0;
        // sprite1.anchor.y = 0;
        // sprite1._name = "sprite";
        // container1.addChild(sprite1);
        //
        // let sprite2 = PIXI.Sprite.from("res/" + "icon/logo1_eng.png");
        // sprite2.scale.set(0.7, 0.7);
        // sprite2.position.x = 0;
        // sprite2.position.y = 0;
        // sprite2.anchor.x = 0.5;
        // sprite2.anchor.y = 0.5;
        // sprite2._name = "sprite";
        // sprite1.addChild(sprite2);

        let text2 = new PIXI.Text(name1, {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'});
        text2.scale.set(1.5, 1.5);
        text2.position.set(0, 0);
        text2.anchor.set(0.5, 0.5);
        text2.rotation = -0.5;
        text2.alpha = 0.5;
        text2._name = "check";
        text2.visible = node1.visible;
        // text2.visible = false;
        node1.addChild(text2);
    }

    check2() {
        let text2 = new PIXI.Text("TEST", {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'});
        text2.scale.set(1.5, 1.5);
        text2.position.set(_w / 2, _h / 2);
        text2.anchor.set(0.5, 0.5);
        text2.rotation = -0.5;
        text2.alpha = 0.5;
        text2._name = "TEST";
        let c1 = new PIXI.Container();
        c1._text = "Check2Container" + (i_Container++);
        c1.addChild(text2);
        c1.visible = true;
        // c1.position.set(_w / 2, _h / 2);
        return c1;
    }

    readNode(name, parent, level) {
        console.log("[D] " + tab_level[level] + "getNode parent: " + parent._name + " L:" + parent._level + " node: " + name + "   i: " + this.i);
        if (this.get_int() === 0) {
            this.read_int();
            return null;
        }
        let n = this.read_int();
        if (n !== -1) {
            console.log("[D] " + tab_level[level] + "found node: " + n);
            return this.m_in[n];
        } else {
            console.log("[D] " + tab_level[level] + "new node started");// + "(" + n.toString(16) + ")");
            n = this.read_int();
            let t = this.read_int();
            console.log("[D] " + tab_level[level] + "n: " + n + "  t: " + t);
            let new_node;
            switch (t) {
                case Type.node:
                    new_node = this.deserialize_node(parent, n, level);
                    console.log("[D] " + tab_level[level] + "done Node: " + name + " (" + n + " - new)");
                    new_node._name = "node" + n;
                    break;
                case Type.scene:
                    new_node = this.deserialize_scene(parent, n, level);
                    console.log("[D] " + tab_level[level] + "Scene: " + name + " [" + new_node + "](" + n + " - new)");
                    console.log(parent.children);
                    console.log(new_node.children);
                    parent.addChild(new_node);
                    break;
                case Type.camera:
                    new_node = new PIXI.Container();
                    new_node._text = "CameraContainer" + (i_Container++);
                    new_node._name = "camera" + n;
                    console.log("[D] " + tab_level[level] + "Camera: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.sprite:
                    new_node = this.deserialize_sprite(parent, n, level);
                    new_node._name = "sprite" + n;
                    console.log("[D] " + tab_level[level] + "Sprite: " + name + " [" + new_node._name + "](" + n + " - new)");
                    break;
                case Type.label:
                    new_node = this.deserialize_label(parent, n, level);
                    new_node._name = "label" + n;
                    console.log("[D] " + tab_level[level] + "Label: " + name + " [" + new_node + "](" + n + " - new)");
                    break;
                case Type.ProtectedNode:
                    new_node = this.deserialize_ProtectedNode(parent, n, level);
                    console.log("[D] " + tab_level[level] + "done ProtectedNode: " + name + " (" + n + " - new)");
                    console.log("[STAGE] " + tab_level[level] + "parent: " + parent._name + " L:" + parent._level);
                    new_node._name = "ProtectedNode" + n;
                    break;
                case Type.Button:
                    new_node = this.deserialize_Button(parent, n, level);
                    console.log("[D] " + tab_level[level] + "Button: " + name + " [" + new_node + "](" + n + " - new)");
                    new_node._name = "Button" + n;
                    break;
                default:
                    new_node = null;
            }
            if (new_node !== null) {
                parent.addChild(new_node);
                new_node._level = parent._level + 1;
                console.log("[STG] " + tab_level[level] + "parent: " + parent._name + " L:" + parent._level);
                console.log("[STG] " + tab_level[level] + "child: " + new_node._name + " L:" + new_node._level);
                new_node._n = n;
            } else {
                return new_node;
            }
            this.m_in[n] = new_node;
            if (this.read_int() === Type.end) {
                console.log("[-] " + tab_level[level] + "End of " + name + " [" + new_node._name + "](" + n + ")");
            } else {
                console.log("[Error] " + name + " [" + new_node._name + "](" + n + ")");
            }
            return new_node;
        }
    }

    deserialize_node(parent, n, level) {
        console.log("[D] " + tab_level[level] + "deserialize_node: " + parent._name + "  L:" + parent._level);
        let node = new PIXI.Container();
        node._name = parent._name + "_node_"
        node._text = "NodeContainer" + (i_Container++);
        this.m_in[n] = node;
        node._level = parent._level + 1;
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
        console.log("[D] " + tab_level[level] + "children_size: " + size);//+ "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            console.log("[D] " + tab_level[level] + "CHILD: " + i);
            this.readNode(parent._name + "_node" + i, node, level + 1);
        }
        node._parent = this.readNode("parent", node, level + 1);
        node._tag = this.read_int();
        node._hashOfName = this.read_int64();
        if (_read_visible) {
            node.visible = this.read_bool();
            node.position.x = 0;
            node.position.y = 0;
        }
        console.log("[NEW] " + tab_level[level] + "Container:" + n +
            "  x: " + node.position.x + "  y: " + node.position.y + "  " + node._text);
        return node;
    }

    deserialize_ProtectedNode(parent, n, level) {
        console.log("[D] " + tab_level[level] + "deserialize_ProtectedNode: " + parent._name + "  L:" + parent._level);
        let node = new PIXI.Container();
        node._text = "PrNodeContainer" + (i_Container++);
        this.m_in[n] = node;
        node._level = parent._level + 1;
        node.position.x = -200 + this.read_float();
        node.position.y = 20 + _h - this.read_float();
        node.position.x = 0;
        node.position.y = 0;
        //-<<< children >>>-
        let size = this.read_int();
        console.log("[D] " + tab_level[level] + "children_size: " + size);// + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            console.log("[D] " + tab_level[level] + "CHILD: " + i);
            node._name = parent._name + "_node" + i;
            this.readNode("_node" + i, node, level + 1);
        }
        return node;
    }

    deserialize_scene(parent, n, level) {
        console.log("[D] " + tab_level[level] + "deserialize_scene: parent:" + parent._name + "  L:" + parent._level);
        let scene = this.deserialize_node(parent, n, level);
        scene._level = level + 1;
        scene._name = "scene" + n;
        this.read_int64();
        let tmp = new PIXI.Container();
        scene._defaultCamera = this.readNode("defaultCamera", tmp, level + 1);
        scene._cameraOrderDirty = this.read_bool();
        this.read_int64();
        scene._physics3dDebugCamera = this.readNode("physics3dDebugCamera", tmp, level + 1);
        scene._navMeshDebugCamera = this.readNode("navMeshDebugCamera", tmp, level + 1);
        console.log("[--] " + tab_level[level] + "deserialize_scene: parent:" + parent._name + "  L:" + parent._level);
        return scene;
    }

    deserialize_sprite(parent, n, level) {
        console.log("[D] " + tab_level[level] + "deserialize_sprite: " + parent._name + "  L:" + parent._level);
        let tmp = new PIXI.Container();
        tmp._text = "SpriteContainer" + (i_Container++);
        tmp._level = parent._level + 1;
        tmp._name = "tmp parent";
        let node = this.deserialize_node(tmp, 12357, level);
        let name = this.read_string();
        let sprite = PIXI.Sprite.from("res/" + name);
        this.m_in[n] = sprite;
        sprite.visible = node.visible;
        if (_read_visible) {
            sprite.position.x = this.read_float();
            sprite.position.y = _h - this.read_float();
        } else {
            sprite.position.x = node.position.x;
            sprite.position.y = node.position.y;
        }
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite._name = "deserialized sprite";
        sprite._file = name;
        sprite._text = "file: " + name;
        sprite.children = tmp.children;
        // this.check(sprite, name);
        sprite.alpha = 0.5;
        return sprite;
    }

    deserialize_label(parent, n, level) {
        console.log("[D] " + tab_level[level] + "deserialize_label: " + parent._name + "  L:" + parent._level);
        let tmp = new PIXI.Container();
        tmp._text = "LabelContainer" + (i_Container++);
        tmp._level = parent._level + 1;
        tmp._name = "tmp parent";
        let node = this.deserialize_node(tmp, 12357, level);
        let mes = this.read_string();
        let text = new PIXI.Text(mes, {fill: 0xffffff, align: 'left'});
        this.m_in[n] = text;
        text.font = this.read_string();
        text.size = this.read_float();
        if (_read_visible) {
            text.position.x = this.read_float();
            text.position.y = _h - this.read_float();
        } else {
            text.position.x = node.position.x;
            text.position.y = node.position.y;
        }
        text.visible = node.visible;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.shadowColor = 0x0;
        text.align = 'left';
        console.log("[Lbl] " + tab_level[level] + "x:" + text.position.x + " y:" + text.position.y + " " + mes);
        return text;
    }

    deserialize_Button(parent, n, level) {
        console.log("[D] " + tab_level[level] + "deserialize_Button: " + parent._name + "  L:" + parent._level);
        let x = this.read_float();
        let y = _h - this.read_float();
        let w = this.read_float();
        let h = this.read_float();
        let name = this.read_string();
        let sprite = PIXI.Sprite.from("res/" + name);
        sprite.position.set(x, y);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = w;
        sprite.height = h;
        sprite._text = name;
        let mes = this.read_string();
        let font = this.read_string();
        let s = this.read_float();
        let text = new PIXI.Text(mes, {fill: 0xffffff, align: 'center', font: font, fontSize: s});
        text.position.set(x, y);
        text.anchor.set(0.5, 0.5);
        let node = new PIXI.Container();
        node._text = "ButtonContainer" + (i_Container++);
        node.position.set(0, 0);
        node.width = w;
        node.height = h;
        node.addChild(sprite);
        node.addChild(text);
        return node;
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

    readActionManager(parent, level) {
        let size = this.read_int();
        console.log("[D] actions_size: " + size + "(" + size.toString(16) + ")");
        for (let i = 0; i < size; ++i) {
            let node = this.readNode("target" + i, parent, level + 1);
            let s = this.read_int();
            console.log("[D] [" + node + "] actions size: " + s);
            for (let j = 0; j < s; ++j) {
                this.readAction(node);
            }
        }
    }

    loadScene() {
        _place.removeChild(app.view);
        _w = this.read_float();// * scale;
        _h = this.read_float();// * scale;
        console.log("[D] w:" + _w);
        console.log("[D] h:" + _h);
        app = new PIXI.Application({width: _w * _scale, height: _h * _scale});
        // app.renderer.background.color = 0;
        _place.appendChild(app.view);

        stage = app.stage;
        stage._level = 0;
        stage.scale.set(_scale, _scale);

        let time = new PIXI.Text("---", {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'});
        time.position.x = _w / 2;
        time.position.y = _h / 16;
        time.anchor.x = 0.5;
        time.anchor.y = 0.5;
        time._name = "server time";
        stage.addChild(time);
        ask(time);

        i_Container = 0;
        stage._name = "main_scene";
        this.readNode("main_scene", stage, 1);
        this.readActionManager(stage, 1);
        console.log(stage);
        console.log(this.m_in);
    }
}
