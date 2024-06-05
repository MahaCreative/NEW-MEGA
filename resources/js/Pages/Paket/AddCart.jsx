import React from "react";

export default function AddCart({ model }) {
    return (
        <div>
            <div className="bg-white py-2 px-3 min-w-[50%] max-w-[95%] max-h-[95%] overflow-auto rounded-md">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-normal text-blue-500 border-b-4 border-blue-500">
                        Show Paket {model?.nama_paket}
                    </p>
                    <button
                        onClick={() => {
                            setModalShow(false);
                            setModel(null);
                        }}
                        className="bg-red-500 text-white text-xl tracking-tighter leading-none px-4 font-bold hover:bg-red-800 transition-all duration-300 ease-linear"
                    >
                        <Tooltip title={"Close"}>
                            <Cancel color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
                <div className="my-3 w-full">
                    {model && (
                        <div className="flex flex-col md:flex-row justify-between gap-5 items-start">
                            <div className="w-full">
                                <img
                                    src={"/storage/" + model.foto_paket}
                                    alt=""
                                    className="h-[350px] w-full object-cover"
                                />
                            </div>
                            <div className="w-full">
                                <h1 className="text-blue-950 font-bold text-lg">
                                    Paket {model?.nama_paket}
                                </h1>
                                <div className="flex gap-3">
                                    <p className="text-white font-normal tracking-tighter">
                                        <CurrencyInput
                                            prefix="Rp. "
                                            value={model.harga_paket}
                                            disabled
                                            className="bg-inherit w-[100px] border-none text-blue-900 text-2xl font-medium tracking-tighter p-0"
                                        />
                                    </p>
                                    <p className="text-blue-900 text-2xl font-medium tracking-tighter">
                                        / {model.kategori_sewa}
                                    </p>
                                </div>
                                <h1 className="text-blue-950 font-bold text-lg">
                                    Deskripsi
                                </h1>
                                <p>{model.deskripsi_paket}</p>
                                <h1 className="text-blue-950 font-bold text-lg">
                                    Catatan
                                </h1>
                                <p>{model.deskripsi_paket}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
