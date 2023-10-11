function ask(label) {
    console.log("[socket] ask");
    const socket = new WebSocket("ws://127.0.0.1:5000/");
    console.log("[socket] new WebSocket");
    socket.binaryType = "arraybuffer";

    socket.onmessage = (event) => {
        console.log("[socket] onmessage");
        console.log("time: " + event.data);
        label.text = event.data;
        socket.close();
    };
    socket.onopen = () => {
        console.log("[socket] onopen");
        socket.send("GET Time");
    }
    socket.onerror = (event) => {
        console.log("[socket] onerror");
        console.log(event);
    }
}

function askScene(buffer) {
    console.log("[socket] askScene");
    const socket = new WebSocket("ws://127.0.0.1:5000/");
    console.log("[socket] new WebSocket");
    socket.binaryType = "arraybuffer";

    socket.onmessage = (event) => {
        console.log("[socket] onmessage");
        console.log("[socket] scene data:");
        console.log(event.data);
        buffer.load_data(event.data);
        socket.close();
    };
    socket.onopen = () => {
        console.log("[socket] onopen");
        socket.send("GET Scene");
    }
    socket.onerror = (event) => {
        console.log("[socket] onerror");
        console.log(event);
    }
}

