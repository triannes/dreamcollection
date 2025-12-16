const modal = document.getElementById("dreamModal");
const modalContent = modal.querySelector(".modal-content");
const modalText = document.getElementById("modalText");

const dreams = {
  dream1: "I woke up crying one time because of a dream that I was going to be eaten by a blue jelly. It wasn't a scary looking jelly. Instead, it was really cute! I don't know why I woke up crying like that. Was it the fear of being chased or the anticipation of being eaten that made me cry?",
  dream2: "I had a dream I was hanging out with my two best friends. We were in a classroom and one of them started singing from the chorus instead of the verse. It was silly, but I suddenly blurted out that I was exhausted. When was the last time I spoke up and told people how I truly felt? Am I not being true to my friends or am I not being true to myself?",
  dream3: "I dreamt I found a body floating underwater. The girl was weightless and still, her eyes open. A blank stare. For some odd reason, I wasn't scared. If I saw something like that I would freak out but instead of being scared I felt comforted. Sometimes I think about that dream. Does death bring peace? Is it not something to be feared?"
};

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", (e) => {
    modal.style.display = "block";
    modalText.textContent = dreams[img.id];
    e.stopPropagation(); 
  });
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

modalContent.addEventListener("click", (e) => {
  e.stopPropagation();
});
