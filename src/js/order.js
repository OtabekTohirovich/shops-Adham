import { cancelUserOrder, completedUserOrder, deleteUserOrder } from "../api";

export function initializeOrderEvent() {
    const orders = document.querySelectorAll(".user__order");
  
    orders.forEach((order) => {
      order.addEventListener("click", (event) => {
        const element = event.target;
        const id = order?.dataset?.id;
        let deleteOrder = element
          .closest(".remove__order")
          ?.classList.contains("remove__order");
        if (deleteOrder) {
          if (!id) return;
          deleteUserOrder(id).then(({ data }) => {
            console.log(data);
            event.target.parentElement.remove();
          });
        }
        let complatedOrder = element
          .closest(".complated__order")
          ?.classList.contains("complated__order");
        if (complatedOrder) {
          if (!id) return;
          completedUserOrder(id).then(({ data }) => {
            console.log(data);
            event.target.parentElement.remove();
          });
        }
        let cancelOrder = element
          .closest(".cansel__order")
          ?.classList.contains("cansel__order");
        if (cancelOrder) {
          if (!id) return;
            cancelUserOrder(id).then(({ data }) => {
            console.log(data);
            // event.target.parentElement.remove()
          });
        }
      });
    });
  }
  