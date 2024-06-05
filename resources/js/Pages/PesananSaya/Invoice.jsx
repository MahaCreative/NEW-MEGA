import { usePage } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function Invoice(props) {
    const { profile } = usePage().props;
    const invoice = props.invoice;

    return (
        <div className="py-6 px-4 w-full h-screen flex justify-center items-center">
            <div className="border border-dashed border-black rounded-md py-3 px-4 w-[550px]">
                <div className="flex justify-between ">
                    <div>
                        <h3 className="text-blue-950 tracking-tighter text-xl capitalize">
                            {profile.nama_wisata}
                        </h3>
                        <p className="font-light text-blue-900 italic text-xs">
                            {profile.alamat_wisata}
                        </p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-blue-950 tracking-tighter text-xl capitalize">
                            INVOICE
                        </h3>
                        <p className="font-light text-blue-900 italic text-md">
                            {invoice.order_id}
                        </p>
                    </div>
                </div>
                <h3 className="text-blue-950 tracking-tighter text-lg capitalize">
                    Tanggal Pembayaran :{" "}
                    {moment(invoice.succeeded_at).format("DD-MM-YYYY")}
                </h3>

                <div className="flex justify-between items-center">
                    <div className="">
                        <h3 className="text-blue-950 font-bold">To</h3>
                        <h3 className="text-blue-950 tracking-tighter text-base capitalize">
                            Costumer Name:{" "}
                            {invoice.user.firstname +
                                " " +
                                invoice.user.lastname}
                        </h3>
                        <p className="font-light text-blue-900 italic text-xs">
                            {invoice.user.email}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-blue-950 font-bold">
                            Payment Type
                        </h3>
                        <p className="font-light text-blue-900 italic text-md">
                            {invoice.payment_type}
                        </p>
                    </div>
                </div>
                <h3 className="text-blue-950 font-bold text-xl">
                    Deskripsi Pesanan
                </h3>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="w-[50px] text-blue-900 font-normal border-dashed border-b-2 border-blue-950">
                                No
                            </td>
                            <td className="text-blue-900 font-normal border-dashed border-b-2 border-blue-950">
                                Nama Paket
                            </td>
                            <td className="text-blue-900 font-normal border-dashed border-b border-blue-950">
                                Harga Paket
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.pesanan.detail.map((item, index) => (
                            <tr key={index}>
                                <td className="text-blue-900 font-normal  border-dashed border-b-2 border-blue-950">
                                    {index + 1}
                                </td>
                                <td className="text-blue-900 font-normal  border-dashed border-b-2 border-blue-950">
                                    {item.nama_paket}
                                </td>
                                <td className="text-blue-900 font-normal  border-dashed border-b border-blue-950">
                                    <CurrencyInput
                                        prefix="Rp. "
                                        value={item.harga_paket}
                                        className="p-0 border-none"
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td
                                colSpan={2}
                                className="bg-blue-200 px-2 py-1 border-r text-blue-900 font-normal border-dashed border-b-2 border-blue-950"
                            >
                                Total Pembayaran
                            </td>
                            <td
                                colSpan={2}
                                className="text-blue-900 px-2 py-1 bg-blue-200 font-normal border-dashed border-b-2 border-blue-950"
                            >
                                <CurrencyInput
                                    prefix="Rp. "
                                    value={invoice.total_pembayaran}
                                    className="p-0 border-none bg-inherit"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
