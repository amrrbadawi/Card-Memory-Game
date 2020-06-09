let mode = prompt("Please Choose a Mode by Typing Its Name\n'Easy': 16 Cards\n'Normal': 26 Cards\n'Hard': 52 Cards\n", "normal");

        mode = mode &&
            (mode.toLowerCase() == "easy" ||
                mode.toLowerCase() == "normal" ||
                mode.toLowerCase() == "hard") ?
            mode.toLowerCase() :
            "normal"

        // mode = "easy"

        // console.log(mode)



        let debugMode = false;

        let turn = 0; // P1 = 0 or P2 = 1

        let selectedCard1 = null
        let selectedCard2 = null

        let node = document.getElementById("mainDiv")

        let playerOneCountNode = document.getElementById("p1Count")
        let playerTwoCountNode = document.getElementById("p2Count")

        let p1Name = prompt("Enter Player 1 Name (letters only)", "Player One") || "Player One";
        // let p1Name = "Player One";

        let p2Name = prompt("Enter Player 2 Name (letters only)", "Player Two") || "Player Two";
        // let p2Name = "Player Two";

        playerOneCountNode.innerText = playerOneCountNode.innerText.replace("Player One", p1Name.replace(/[^a-zA-Z]+/, "") + "'s")
        playerTwoCountNode.innerText = playerTwoCountNode.innerText.replace("Player Two", p2Name.replace(/[^a-zA-Z]+/, "") + "'s")

        let gameWaiting = false

        let gameEnded = false

        let cardsStatus = {};

        // let colorsMap = {
        //     "S": "B",
        //     "C": "B",
        //     "D": "R",
        //     "H": "R"
        // }


        document.getElementById("endBtn").addEventListener("click", function () {
            gameEnded = true
        })

        document.getElementById("resetBtn").addEventListener("click", function () {
            window.location.reload();
        })

        let changeAvatar = function (e) {
            console.log(e.target.files[0].name)
            if (e.target.id == "avatar1input") {
                document.getElementById("p1Img").setAttribute("src", URL.createObjectURL(e.target.files[0]))
            } else {
                document.getElementById("p2Img").setAttribute("src", URL.createObjectURL(e.target.files[0]))
            }
        }

        document.getElementById("anchor1").addEventListener("click", function () {
            document.getElementById("avatar1input").click()
        })
        document.getElementById("anchor2").addEventListener("click", function () {
            document.getElementById("avatar2input").click()
        })

        document.getElementById("avatar1input").addEventListener("change", changeAvatar)
        document.getElementById("avatar2input").addEventListener("change", changeAvatar)


        let initGame = function () {

            let colors = ["S", "C", "D", "H"]
            let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J"]
            let combos = []


            if (mode == "easy") {
                colors = ["S", "H"]
                cards = ["A", "2", "3", "4", "5", "6", "7", "8"]
            } else if (mode == "normal") {
                colors = ["S", "H"]
                cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J"]
            }


            for (let i = 0; i < cards.length; i++) {
                for (let j = 0; j < colors.length; j++) {
                    combos.push(cards[i] + colors[j])
                }
            }


            // console.log("combos", combos)

            if (!debugMode)
                combos = shuffle(combos)


            for (let i = 0; i < combos.length; i++) {
                // <img src="">
                let newImg = document.createElement("IMG")
                let cardName = combos[i] // + colors[j]

                newImg.setAttribute("src", "./imgs/blue_back.png")
                newImg.setAttribute("name", cardName)
                newImg.setAttribute("class", "card")
                newImg.addEventListener("click", handleCardClick);
                node.appendChild(newImg)


                // cardsStatus = {"AS":{handle:newImg, value:"A", selected: false}}
                cardsStatus[cardName] = {}
                cardsStatus[cardName]["handle"] = newImg
                cardsStatus[cardName]["value"] = cardName.substring(0, cardName.length - 1)
                cardsStatus[cardName]["selected"] = false

            }
            if (turn) {
                playerOneCountNode.setAttribute("class", "player")
                playerTwoCountNode.setAttribute("class", "activePlayer")
            } else {
                playerOneCountNode.setAttribute("class", "activePlayer")
                playerTwoCountNode.setAttribute("class", "player")
            }
            // console.log(cardsStatus)
        }

        let shuffle = function (a) {
            let j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

        let mainGameLoop = function () {

            if (!gameEnded) {

                let p1Score = Number(playerOneCountNode.innerText.replace(/[^0-9]+/, ""))
                let p2Score = Number(playerTwoCountNode.innerText.replace(/[^0-9]+/, ""))
                // console.log(mode, p1Score, p2Score, playerOneCountNode.innerText.replace(/[^0-9]+/, ""), playerTwoCountNode.innerText.replace(/[^0-9]+/, ""))
                if (mode == "easy" && ((p1Score > 8 || p2Score > 8) || (p1Score == 8 && p2Score == 8))) {
                    gameEnded = true
                } else if (mode == "normal" && (p1Score > 12 || p2Score > 12)) {
                    gameEnded = true
                } else if (mode == "hard" && ((p1Score > 26 || p2Score > 26) || (p1Score == 26 && p2Score == 26))) {
                    gameEnded = true
                }
            }


            if (!gameEnded && !gameWaiting && selectedCard1 && selectedCard2) {

                gameWaiting = true

                let p1Score = Number(playerOneCountNode.innerText.replace(/[^0-9]+/, ""))
                let p2Score = Number(playerTwoCountNode.innerText.replace(/[^0-9]+/, ""))

                if (cardsStatus[selectedCard1].value == cardsStatus[selectedCard2].value) {

                    // console.log("same cards")


                    (function (selectedCard1Copy, selectedCard2Copy) {
                        setTimeout(function () {
                            // cardsStatus[selectedCard1Copy].handle.addEventListener("click", null)
                            // cardsStatus[selectedCard2Copy].handle.addEventListener("click", null)
                            node.removeChild(cardsStatus[selectedCard1Copy].handle)
                            node.removeChild(cardsStatus[selectedCard2Copy].handle)
                            if (turn) {
                                playerOneCountNode.innerText = playerOneCountNode.innerText.replace(p1Score, p1Score + 2)
                                playerOneCountNode.setAttribute("class", "player")
                                playerTwoCountNode.setAttribute("class", "activePlayer")
                            } else {
                                playerTwoCountNode.innerText = playerTwoCountNode.innerText.replace(p2Score, p2Score + 2)
                                playerOneCountNode.setAttribute("class", "activePlayer")
                                playerTwoCountNode.setAttribute("class", "player")
                            }
                            gameWaiting = false;
                        }, 1000);
                    })(selectedCard1, selectedCard2);


                } else {


                    (function (selectedCard1Copy, selectedCard2Copy) {
                        setTimeout(function () {
                            // console.log(selectedCard1Copy)
                            flipCard(selectedCard1Copy)
                            flipCard(selectedCard2Copy)
                            if (turn) {
                                playerOneCountNode.setAttribute("class", "player")
                                playerTwoCountNode.setAttribute("class", "activePlayer")
                            } else {
                                playerOneCountNode.setAttribute("class", "activePlayer")
                                playerTwoCountNode.setAttribute("class", "player")
                            }
                            gameWaiting = false;
                        }, 1000);
                    })(selectedCard1, selectedCard2);

                }

                turn = !turn
                selectedCard1 = selectedCard2 = null;
            } else if (gameEnded) {


                let p1Score = Number(playerOneCountNode.innerText.replace(/[^0-9]+/, ""))
                let p2Score = Number(playerTwoCountNode.innerText.replace(/[^0-9]+/, ""))

                if (p1Score > p2Score) {
                    document.getElementById("overlayImg").setAttribute("src", "./imgs/win.png")
                    document.getElementById("overlayDiv").style.display = ""
                    setTimeout(() => {
                        alert(`${p1Name} WON!`);
                        window.location.reload();
                    }, 500);
                } else if (p1Score < p2Score) {
                    document.getElementById("overlayImg").setAttribute("src", "./imgs/win.png")
                    document.getElementById("overlayDiv").style.display = ""
                    setTimeout(() => {
                        alert(`${p2Name} WON!`);
                        window.location.reload();
                    }, 500);
                } else {
                    document.getElementById("overlayImg").setAttribute("src", "./imgs/draw.png")
                    document.getElementById("overlayDiv").style.display = ""
                    setTimeout(() => {
                        alert("IT IS A DRAW!")
                        window.location.reload();
                    }, 500);
                }
                clearInterval(intervalHandle)
            }
        }

        let handleCardClick = function (event) {
            if (!gameWaiting) {

                if (!selectedCard1) {
                    selectedCard1 = event.target.name
                    flipCard(event.target.name)

                } else if (!selectedCard2) {

                    if (selectedCard1 != event.target.name) {

                        selectedCard2 = event.target.name
                        flipCard(event.target.name)

                    }

                }

            }
        }

        let flipCard = function (name) {
            if (!cardsStatus[name]["selected"]) {

                cardsStatus[name]["handle"].setAttribute("src", `./imgs/${name}.png`)
                cardsStatus[name]["selected"] = true

            } else {

                cardsStatus[name]["handle"].setAttribute("src", "./imgs/blue_back.png")
                cardsStatus[name]["selected"] = false

            }
        }

        initGame()
        let intervalHandle = setInterval(mainGameLoop, 40)