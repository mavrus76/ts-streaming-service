import { IUser } from "~/types/user.interface";
import { createElement } from "@utils/createElement";
import { getShotName } from "@utils/getShotName";
import { AbstractComponent } from "@components/abstractComponent";

export class User extends AbstractComponent {
	constructor(private readonly items: IUser[]) {
		super();
	}

	getElement() {
		this.parent = document.getElementById("header") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <button class="header__user">
        <img
          class="header__user__img"
          src="public/user.jpg"
          alt="Изображение пользователя"
        /><span class="header__user__text">${
					this.items[0].firstName
				} ${getShotName(this.items[0].lastName)}</span
        >
        <svg
          class="header__user__svg"
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.528636 1.02859C0.788986 0.768245 1.2111 0.768245 1.47145 1.02859L5.47145 5.02859C5.73179 5.28894 5.73179 5.71105 5.47145 5.9714L1.47145 9.9714C1.2111 10.2318 0.788986 10.2318 0.528636 9.9714C0.268287 9.71105 0.268287 9.28894 0.528636 9.02859L4.05723 5.5L0.528636 1.9714C0.268287 1.71105 0.268287 1.28894 0.528636 1.02859Z"
            fill="#FC6D3E"
          />
        </svg>
      </button>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".header__user") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
