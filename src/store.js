import create from 'zustand';


let nextId = 0;


const useStore = create(
    setState => ({
        data: [],
        create: notification => setState(state => ({
            data: [...state.data, { ...notification, id: nextId++ }]
        })),
        remove: (id) => setState(state => ({
            data: state.data.filter(n => n.id !== id)
        }))
    })
);


export default useStore;
