import DialogChakra from "../components/DialogChakra"
import CrossIcon from "../utils/icons/CrossIcon"
import FormSupplier from "../components/FormSupplier"

export default function Suppliers() {
    return (
        <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[30px] font-[700]">Suppliers</h1>
                    <span className="text-[#667085]">Manage your supplier database</span>
                </div>
                <DialogChakra
                    buttonStyles="bg-[#5CE18C]"
                    buttonText="Add Supplier"
                    dialogTitle="Add New Supplier"
                    saveButtonStyles="bg-[#5CE18C]"
                >
                    <CrossIcon color="#FFFFFF" size="10" />
                    <FormSupplier />
                </DialogChakra>
            </div>
        </div>
    )
}