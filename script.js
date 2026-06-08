const colorPicker = document.getElementById("colorPicker");
const preview = document.getElementById("preview");

const hexCode = document.getElementById("hexCode");
const rgbCode = document.getElementById("rgbCode");

const copyBtn = document.getElementById("copyBtn");
const randomBtn = document.getElementById("randomBtn");

const gradientColor1 =
document.getElementById("gradientColor1");

const gradientColor2 =
document.getElementById("gradientColor2");

const generateGradient =
document.getElementById("generateGradient");

const gradientPreview =
document.getElementById("gradientPreview");

const exportPalette =
document.getElementById("exportPalette");

const historyContainer =
document.getElementById("history");

const toggleBackground =
document.getElementById("toggleBackground");


function hexToRgb(hex){

    const r =
    parseInt(hex.slice(1,3),16);

    const g =
    parseInt(hex.slice(3,5),16);

    const b =
    parseInt(hex.slice(5,7),16);

    return `rgb(${r}, ${g}, ${b})`;
}


function renderHistory(){

    const colors =
    JSON.parse(
        localStorage.getItem("colors")
    ) || [];

    historyContainer.innerHTML = "";

    colors.forEach(color => {

        const box =
        document.createElement("div");

        box.classList.add("color-box");

        box.style.background = color;

        box.title = color;

        box.addEventListener(
            "click",
            () => {

                colorPicker.value = color;

                updateColor(color);

            }
        );

        historyContainer.appendChild(box);

    });
}


function saveColor(color){

    let colors =
    JSON.parse(
        localStorage.getItem("colors")
    ) || [];

    colors =
    colors.filter(c => c !== color);

    colors.unshift(color);

    colors = colors.slice(0,10);

    localStorage.setItem(
        "colors",
        JSON.stringify(colors)
    );

    renderHistory();
}


function updateColor(color){

    preview.style.background = color;

    hexCode.value =
    color.toUpperCase();

    rgbCode.value =
    hexToRgb(color);

    saveColor(color);
}


updateColor("#3B82F6");


colorPicker.addEventListener(
    "input",
    () => {

        updateColor(
            colorPicker.value
        );

    }
);


copyBtn.addEventListener(
    "click",
    () => {

        navigator.clipboard.writeText(
            hexCode.value
        );

        copyBtn.textContent =
        "Copied!";

        setTimeout(() => {

            copyBtn.textContent =
            "Copy";

        },1500);

    }
);


function randomColor(){

    const letters =
    "0123456789ABCDEF";

    let color = "#";

    for(let i=0;i<6;i++){

        color +=
        letters[
            Math.floor(
                Math.random()*16
            )
        ];
    }

    colorPicker.value = color;

    updateColor(color);
}

randomBtn.addEventListener(
    "click",
    randomColor
);


generateGradient.addEventListener(
    "click",
    () => {

        const color1 =
        gradientColor1.value;

        const color2 =
        gradientColor2.value;

        const gradient =
        `linear-gradient(
            135deg,
            ${color1},
            ${color2}
        )`;

        preview.style.background =
        gradient;

        gradientPreview.style.background =
        gradient;

        document.querySelector(
            ".container"
        ).style.background = `
            linear-gradient(
                rgba(0,0,0,0.35),
                rgba(0,0,0,0.35)
            ),
            ${gradient}
        `;
    }
);


exportPalette.addEventListener(
    "click",
    () => {

        const palette = {

            hex: hexCode.value,

            rgb: rgbCode.value,

            generatedAt:
            new Date()
            .toLocaleString()

        };

        const blob =
        new Blob(
            [
                JSON.stringify(
                    palette,
                    null,
                    2
                )
            ],
            {
                type:
                "application/json"
            }
        );

        const link =
        document.createElement("a");

        link.href =
        URL.createObjectURL(blob);

        link.download =
        "palette.json";

        link.click();

    }
);


toggleBackground.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "image-bg"
        );

    }
);


renderHistory();