const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const names = ['tai'];

    const root = $('#root');
    const input = $('#input');
    const submit = $('#submit');

    return {
        add(name) {
            names.push(name);
        },
        delete(index) {
            names.splice(index, 1);
        },
        render() {
            const html = names.map((name, index) =>`
                <li>${name}
                <span class="delete" data-index:${index}>&times</span>
                </li>
                `
            )
            .join('');

            root.innerHTML = html;
        },
        handleDelete(e) {
            const deleteBtn = e.target.closest('.delete')
            if (deleteBtn) {
                const index = deleteBtn.dataset.index
                this.delete(index)
                this.render()
            }
        },
        init() {
            // handle DOM events
            submit.onclick = () => {
                const name = input.value;
                this.add(name);
                this.render();

                input.value = null;
                input.focus();
            }
            root.onclick = this.handleDelete.bind(this)
            this.render();
        },
    }
})();

app.init();