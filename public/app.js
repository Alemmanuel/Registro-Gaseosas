document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gaseosaForm');
    const gaseosasList = document.getElementById('gaseosasItems');
    // const API_URL = 'http://localhost:3000/api';
    const API_URL = 'https://registrogaseosas.vercel.app/api';
    const saborSelect = document.getElementById('sabor');
    const cantidadInput = document.getElementById('cantidad');
    const valorTotalInput = document.getElementById('valorTotal');
    const sizeSelect = document.getElementById('size');

    // Variables para el modal de edición
    const editModal = document.getElementById('editModal');
    const editSabor = document.getElementById('editSabor');
    const editCantidad = document.getElementById('editCantidad');
    const editValorTotal = document.getElementById('editValorTotal');
    const editEstado = document.getElementById('editEstado');
    const editModoPago = document.getElementById('editModoPago');
    const editSize = document.getElementById('editSize');
    const saveEditButton = document.getElementById('saveEdit');
    const cancelEditButton = document.getElementById('cancelEdit');
    const editpersona_nombre = document.getElementById('editpersona_nombre');
    let gaseosaIdToEdit = null;

    // Variables para el modal de confirmación de eliminación
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    let gaseosaIdToDelete = null;

    // Variables para los filtros
    const filterFecha = document.getElementById('filterFecha');
    const applyFiltersButton = document.getElementById('applyFilters');
    const clearFiltersButton = document.getElementById('clearFilters');

    applyFiltersButton.addEventListener('click', () => {
        fetchGaseosasFilter();
    });

    clearFiltersButton.addEventListener('click', () => {
        filterFecha.value = '';
        fetchGaseosas();
    });

    saborSelect.addEventListener('change', actualizarValorTotal);
    sizeSelect.addEventListener('change', actualizarValorTotal);
    cantidadInput.addEventListener('input', actualizarValorTotal);

    const openConfirmModalButton = document.getElementById('openConfirmModal');
    const confirmModal = document.getElementById('confirmModal');
    const confirmRegisterButton = document.getElementById('confirmRegister');
    const cancelRegisterButton = document.getElementById('cancelRegister');

    openConfirmModalButton.addEventListener('click', () => {
        confirmModal.classList.remove('hidden');
    });

    cancelRegisterButton.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    const modoPagoSelect = document.getElementById('modoPago');
    const persona_nombreInput = document.getElementById('persona_nombre');

    confirmRegisterButton.addEventListener('click', async () => {
        confirmModal.classList.add('hidden');
        const formData = new FormData(form);
        const gaseosaData = Object.fromEntries(formData.entries());
        gaseosaData.size = sizeSelect.value; // Asegurar incluir el tamaño

        console.log('Sending data:', gaseosaData);

        // Agregar la fecha actual al objeto gaseosaData
        const now = new Date();
        gaseosaData.fechaVenta = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0];

        try {
            const response = await fetch(`${API_URL}/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gaseosaData),
            });

            if (response.ok) {
                form.reset();
                actualizarValorTotal();
                fetchGaseosas();
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Error al registrar gaseosa: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al registrar gaseosa:', error);
            alert('Error al registrar gaseosa. Verifica que el servidor esté en funcionamiento.');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    async function fetchGaseosas() {
        try {
            const response = await fetch(`${API_URL}/consultar`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en la respuesta del servidor');
            }

            const gaseosas = await response.json();
            console.log('Gaseosas recibidas:', gaseosas);
            renderGaseosas(gaseosas);
        } catch (error) {
            console.error('Error detallado:', error);
            alert(`Error al obtener gaseosas: ${error.message}`);
        }
    }

    async function fetchGaseosasFilter() {
        try {
            const response = await fetch(`${API_URL}/consultar?fecha=${filterFecha.value}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en la respuesta del servidor');
            }
            const gaseosas = await response.json();
            console.log('Gaseosas recibidas:', gaseosas);
            renderGaseosas(gaseosas);
        } catch (error) {
            console.error('Error detallado:', error);
            alert(`Error al obtener gaseosas: ${error.message}`);
        }
    }

    function formatFecha(fechaISO) {
        if (!fechaISO) return 'Fecha inválida';

        const fechaUTC = new Date(fechaISO);
        const fechaLocal = new Date(fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000);

        return fechaLocal.toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    function formatPrecio(valor) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(valor);
    }

    function renderGaseosas(gaseosas) {
        console.log('renderGaseosas', gaseosas);
        const filteredGaseosas = gaseosas.filter(gaseosa => {
            const fecha = filterFecha.value ? new Date(filterFecha.value).toISOString().split('T')[0] : '';
            return (!fecha || gaseosa.fechaventa.startsWith(fecha));
        });

        gaseosasList.innerHTML = '';
        filteredGaseosas.forEach(gaseosa => {
            // Usamos únicamente la propiedad "persona_nombre"
            const nombrePersona = gaseosa.persona_nombre || '';
            const tamano = gaseosa.size || gaseosa.tamano || '';
            const tr = document.createElement('tr');
            tr.setAttribute('id', `row-${gaseosa.id}`);
            tr.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="edit-button text-indigo-600 hover:text-indigo-900"
            data-id="${gaseosa.id}"
            data-sabor="${gaseosa.sabor}"
            data-cantidad="${gaseosa.cantidad}"
            data-estado="${gaseosa.estado}"
            data-modoPago="${gaseosa.modopago}"
            data-size="${tamano}"
            data-valorTotal="${gaseosa.valortotal}"
            data-personaNombre="${nombrePersona}">
            <i class="fas fa-edit"></i>
        </button>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="delete-button text-red-600 hover:text-green-900" data-id="${gaseosa.id}">
            <i class="fas fa-trash-alt"></i>
        </button>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatFecha(gaseosa.fechaventa)}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${gaseosa.sabor}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${gaseosa.cantidad}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${gaseosa.estado}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatPrecio(gaseosa.valortotal)}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${gaseosa.modopago}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tamano}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 persona-nombre">${nombrePersona}</td>
`;

            gaseosasList.appendChild(tr);
        });

        const editButtons = document.querySelectorAll(".edit-button");
        const deleteButtons = document.querySelectorAll(".delete-button");

        editButtons.forEach(button => {
            button.addEventListener("click", openEditModal);
        });

        deleteButtons.forEach(button => {
            button.addEventListener("click", openDeleteModal);
        });
    }


    function actualizarValorTotal() {
        const selectedSabor = saborSelect.value;
        const selectedSize = sizeSelect.value;
        const cantidad = parseInt(cantidadInput.value);
        let precioUnidad = 0;

        console.log('Selected Sabor:', selectedSabor);
        console.log('Selected Size:', selectedSize);
        console.log('Cantidad:', cantidad);

        if (selectedSabor && selectedSize) {
            if (selectedSabor === 'Colombiana') {
                if (selectedSize === 'mega') {
                    precioUnidad = 8000;
                } else if (selectedSize === '1.5L') {
                    precioUnidad = 5000;
                }
            } else if (selectedSabor === 'Coca Cola') {
                if (selectedSize === 'mega') {
                    precioUnidad = 9500;
                } else if (selectedSize === '1.5L') {
                    precioUnidad = 6500;
                }
            } else if (selectedSabor === 'Cuatro') {
                if (selectedSize === 'mega') {
                    precioUnidad = 9500;
                } else if (selectedSize === '1.5L') {
                    precioUnidad = 6000;
                }
            } else if (selectedSabor === 'Ginger') {
                if (selectedSize === '1.5L') {
                    precioUnidad = 6500;
                }
            } else if (selectedSabor === 'Bretana') {
                if (selectedSize === '1.5L') {
                    precioUnidad = 4500;
                }
            } else if (selectedSabor === 'Manzana Mega') {
                if (selectedSize === 'mega') {
                    precioUnidad = 8000;
                }
            }
        }

        console.log('Precio Unidad:', precioUnidad);

        if (!isNaN(precioUnidad) && !isNaN(cantidad)) {
            valorTotalInput.value = precioUnidad * cantidad;
        } else {
            valorTotalInput.value = 0;
        }

        console.log('Valor Total:', valorTotalInput.value);
    }

    function actualizarValorTotalEdit() {
        const selectedSabor = editSabor.value;
        const selectedSize = editSize.value;
        const cantidad = parseInt(editCantidad.value);
        let precioUnidad = 0;

        console.log('Edit Selected Sabor:', selectedSabor);
        console.log('Edit Selected Size:', selectedSize);
        console.log('Edit Cantidad:', cantidad);

        if (selectedSabor && selectedSize) {
            if (selectedSabor === 'Colombiana') {
                if (selectedSize === 'mega') {
                    precioUnidad = 8000;
                } else if (selectedSize === '1.5L') {
                    precioUnidad = 5000;
                }
            } else if (selectedSabor === 'Coca Cola') {
                if (selectedSize === 'mega') {
                    precioUnidad = 9500;
                } else if (selectedSize === '1.5L') {
                    precioUnidad = 6500;
                }
            } else if (selectedSabor === 'Cuatro') {
                if (selectedSize === 'mega') {
                    precioUnidad = 9500;
                } else if (selectedSize === '1.5L') {
                    precioUnidad = 6000;
                }
            } else if (selectedSabor === 'Ginger') {
                if (selectedSize === '1.5L') {
                    precioUnidad = 6500;
                }
            } else if (selectedSabor === 'Bretana') {
                if (selectedSize === '1.5L') {
                    precioUnidad = 4500;
                }
            } else if (selectedSabor === 'Manzana Mega') {
                if (selectedSize === 'mega') {
                    precioUnidad = 8000;
                }
            }
        }

        console.log('Edit Precio Unidad:', precioUnidad);

        if (!isNaN(precioUnidad) && !isNaN(cantidad)) {
            editValorTotal.value = precioUnidad * cantidad;
        } else {
            editValorTotal.value = 0;
        }

        console.log('Edit Valor Total:', editValorTotal.value);
    }

    editSabor.addEventListener('change', actualizarValorTotalEdit);
    editSize.addEventListener('change', actualizarValorTotalEdit);
    editCantidad.addEventListener('input', actualizarValorTotalEdit);

    function openEditModal(event) {
        const button = event.currentTarget;
        gaseosaIdToEdit = button.getAttribute('data-id');
        editSabor.value = button.getAttribute('data-sabor');
        editCantidad.value = button.getAttribute('data-cantidad');
        editEstado.value = button.getAttribute('data-estado');
        editModoPago.value = button.getAttribute('data-modoPago');
        editSize.value = button.getAttribute('data-size');
        editValorTotal.value = button.getAttribute('data-valorTotal');
        // Se asigna el nombre actual al campo de edición
        editpersona_nombre.value = button.getAttribute('data-persona_nombre') || '';
        editModal.classList.remove('hidden');
    }


    function openDeleteModal(event) {
        const button = event.currentTarget;
        gaseosaIdToDelete = button.getAttribute('data-id');
        deleteModal.classList.remove('hidden');
    }

    saveEditButton.addEventListener('click', async () => {
        if (gaseosaIdToEdit) {
            const nuevoNombre = editpersona_nombre.value;
            const updatedGaseosa = {
                sabor: editSabor.value,
                cantidad: editCantidad.value,
                estado: editEstado.value,
                modoPago: editModoPago.value,
                size: editSize.value,
                valorTotal: editValorTotal.value,
                persona_nombre: nuevoNombre
            };

            try {
                const response = await fetch(`${API_URL}/actualizar/${gaseosaIdToEdit}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedGaseosa)
                });

                if (response.ok) {
                    // Actualizar directamente la fila en la tabla sin recargar
                    const row = document.getElementById(`row-${gaseosaIdToEdit}`);
                    if (row) {
                        row.querySelector('.persona-nombre').textContent = nuevoNombre;
                    }

                    editModal.classList.add('hidden');
                    gaseosaIdToEdit = null;
                } else {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    alert(`Error al actualizar gaseosa: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error al actualizar gaseosa:', error);
                alert('Error al actualizar gaseosa. Verifica que el servidor esté en funcionamiento.');
            }
        }
    });




    cancelEditButton.addEventListener('click', () => {
        editModal.classList.add('hidden');
        gaseosaIdToEdit = null;
    });

    confirmDeleteButton.addEventListener('click', async () => {
        if (gaseosaIdToDelete) {
            try {
                const response = await fetch(`${API_URL}/eliminar/${gaseosaIdToDelete}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchGaseosas();
                    deleteModal.classList.add('hidden');
                    gaseosaIdToDelete = null;
                }
            } catch (error) {
                console.error('Error al eliminar gaseosa:', error);
            }
        }
    });

    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
        gaseosaIdToDelete = null;
    });

    actualizarValorTotal();
    fetchGaseosas();
});

