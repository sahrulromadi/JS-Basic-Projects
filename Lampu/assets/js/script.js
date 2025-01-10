document.addEventListener("DOMContentLoaded", () => {
  createElement();
  showBoxSaklar();
  handleBoxLampu();
});

const showBoxSaklar = () => {
  const iconSetting = document.getElementById("iconSetting");
  const boxSaklar = document.getElementById("boxSaklar");

  iconSetting.addEventListener("click", () => {
    boxSaklar.classList.toggle("hidden");
  });
};

const createElement = () => {
  const getLampuContainer = document.getElementsByClassName("lampuContainer");
  const arrayGetLampuContainer = Array.from(getLampuContainer);

  arrayGetLampuContainer.forEach((element, index) => {
    element.innerHTML = `
    <div class="flex flex-col justify-center items-center">
        <div>
            <img
                id="img-${index}"
                src="assets/img/off.gif"
                alt="off"
                class="w-24 h-24 object-contain"
            />
        </div>
        <!-- Toggle -->
        <div id="toggle-${index}" class="flex items-center mt-4">
            <input type="checkbox" id="checkbox-${index}" class="hidden" />
            <label for="checkbox-${index}" class="flex items-center cursor-pointer">
                <div class="w-12 h-6 bg-gray-300 rounded-full p-1 transition-all duration-300 ease-in-out">
                    <div class="w-4 h-4 rounded-full bg-white transition-all duration-300 ease-in-out"></div>
                </div>
            </label>
        </div>
        <!-- End Toggle -->
    </div>
    `;

    handleLampu(index);
  });
};

const handleLampu = (index, status) => {
  const checkbox = document.getElementById(`checkbox-${index}`);
  const img = document.getElementById(`img-${index}`);
  const label = checkbox.nextElementSibling;
  const toggleContainer = label.querySelector("div");
  const toggleButton = toggleContainer.querySelector("div");

  // untuk handleBoxLampu
  img.src = status ? "assets/img/on.gif" : "assets/img/off.gif";
  img.alt = status ? "on" : "off";
  toggleContainer.style.backgroundColor = status ? "#FFFF00" : "";
  toggleButton.style.transform = status ? "translateX(150%)" : "";

  checkbox.addEventListener("change", () => {
    const statusCheckbox = checkbox.checked;

    img.src = statusCheckbox ? "assets/img/on.gif" : "assets/img/off.gif";
    img.alt = statusCheckbox ? "on" : "off";

    toggleContainer.style.backgroundColor = statusCheckbox ? "#FFFF00" : "";
    toggleButton.style.transform = statusCheckbox ? "translateX(150%)" : "";
  });
};

const handleBoxLampu = () => {
  const checkboxIconLength = 4;

  [...Array(checkboxIconLength)].map((_, index) => {
    const checkboxIcon = document.getElementById(`checkboxIcon${index + 1}`);
    const label = checkboxIcon.nextElementSibling;
    const toggleContainer = label.querySelector("div");
    const toggleButton = toggleContainer.querySelector("div");

    checkboxIcon.addEventListener("change", () => {
      const statusCheckbox = checkboxIcon.checked;

      toggleContainer.style.backgroundColor = statusCheckbox ? "#FFFF00" : "";
      toggleButton.style.transform = statusCheckbox ? "translateX(150%)" : "";

      if (index === 0) {
        handleLampu(0, statusCheckbox);
        handleLampu(1, statusCheckbox);
        handleLampu(2, statusCheckbox);
      } else if (index === 1) {
        handleLampu(3, statusCheckbox);
      } else if (index === 2) {
        handleLampu(4, statusCheckbox);
        handleLampu(5, statusCheckbox);
      } else {
        handleLampu(6, statusCheckbox);
        handleLampu(7, statusCheckbox);
        handleLampu(8, statusCheckbox);
        handleLampu(9, statusCheckbox);
      }
    });
  });
};
