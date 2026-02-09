import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { Icon } from '@iconify/react';
import { StatCard, InfoCard, SectionCard, InputGroup } from '../../components/inventory/InventoryDetailComponents';

const InventoryDetail = () => {
    const { id } = useParams();

    // Mock Data
    const product = {
        name: "Buddabomb Taro Taro 500mg",
        totalStock: "503 kg",
        lowStockAlert: "30 kg",
        outOfStockCount: "4 times",
        images: ["image1.jpg", "image2.jpg", "image3.jpg"], // Placeholders
        description: `Kush Kraft Premium Pre-Rolls – Blue Gelato
Kush Kraft's Blue Gelato pre-rolls offer a refined twist on a fruity powerhouse. This balanced hybrid blends the sweet berry notes of Blueberry with the citrusy richness of Gelato, creating a flavour profile that's both smooth and invigorating. Expect a pleasant high that starts with an uplifting head buzz and gradually melts into calm, collected body relaxation.
Each pre-roll is crafted with hand-selected whole flower, not shake or trim, ensuring consistent quality with every puff. Rolled in unbleached hemp paper, Blue Gelato burns evenly and cleanly, letting the layered flavours shine through from the first inhale to the last.
Whether you're easing into your afternoon or capping off your evening, Blue Gelato offers a satisfying balance of clarity and calm. It's a reliable go-to for creative moments, social sessions, or simply enjoying the flavour ride.
Features & Details
• Strain Type: Hybrid, balanced and flavourful
• THC Content: 19 to 24%
• Per Roll: 0.6 grams of whole flower
• Pack Size: 5 pre-rolls per pouch
• Paper: Unbleached hemp for a clean, even burn
Kush Kraft's Blue Gelato pre-rolls combine fresh flavour with premium craftsmanship. It's bold, smooth and made for those who want something just a little extra with their unwind time.`,
        priceUnit: "Grams",
        thcUnit: "MG",
        thc: "100",
        cbd: "200",
        cbn: "500",
        purchaseQty: "1023 Unit",
        availablePurchase: "100 Units",
        purchaseCost: "$10,230.00",
        avgCost: "$19.56",
        salePrice: "$10,999.00",
        discountedPrice: "$10,979.00",
        lowStockAlertValue: "23 Unit",
        availableLowStock: "100 Units",
        availableQty: "568 Units",
        availableValuation: "$1952.36",
        mainImageAlt: "Buddabomb Taro Taro 500mg"
    };

    return (
        <div className="flex flex-col gap-2 p-1 min-w-0">
            {/* Header Section */}
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    <Link to="/inventory" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800">{product.name}</h1>
                </div>
                <Link to={`/inventory/edit/${id}`} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-[#0e8a1d]">
                    <Edit className="w-4 h-4" />
                    Edit Inventory
                </Link>
            </div>

            {/* Product Images */}
            <div className=" bg-white p-3 rounded-sm border border-gray-200">
                <div className="flex gap-2 overflow-x-auto ">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-30 h-30 rounded-sm border-2 flex-shrink-0 bg-white flex items-center justify-center ${i === 1 ? 'border-purple-300 ring-2 ring-purple-100' : 'border-gray-200'}`}>
                            {/* Placeholder for image */}
                            <div className={`w-24 h-24 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 text-xs`}>
                                <Icon icon="mdi:image" className="w-8 h-8 opacity-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <StatCard label="Total Stock" value={product.totalStock} />
                <StatCard label="Low Stock Alert" value={product.lowStockAlert} />
                <StatCard label="Out of Stock" value={product.outOfStockCount} subtextClass="text-gray-500" />
            </div>

            {/* General Information */}
            <div className=" bg-white p-3 rounded-sm ">
                <div>
                    <h3 className="text-[#000] font-bold text-sm mb-2">General Information</h3>
                    <hr className="border-gray-400 mb-3" />
                    <div className="bg-white rounded-sm border border-[#DDDDDD] p-2">
                        <h4 className="font-bold text-sm text-[#000] underline mb-2">Description</h4>
                        <p className="text-xs text-[#000] leading-relaxed whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Units Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div className="bg-white border border-[#DDDDDD] rounded-sm p-3">
                        <label className="block text-xs font-bold text-[#212121] underline mb-1">Price Unit</label>
                        <span className="text-sm text-[#000] font-light">{product.priceUnit}</span>
                    </div>
                    <div className="bg-white border border-[#DDDDDD] rounded-sm p-3">
                        <label className="block text-xs font-bold text-[#212121] underline mb-1">THC/CBD/CBN Unit</label>
                        <span className="text-sm text-[#000] font-light">{product.thcUnit}</span>
                    </div>
                </div>

                {/* THC/CBD/CBN Values Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 mb-2">
                    <div className="bg-white border border-[#DDDDDD] rounded-sm p-3">
                        <label className="block text-xs font-bold text-[#212121] underline mb-1">THC MG</label>
                        <span className="text-sm text-[#000] font-light">{product.thc}</span>
                    </div>
                    <div className="bg-white border border-[#DDDDDD] rounded-sm p-3">
                        <label className="block text-xs font-bold text-[#212121] underline mb-1">CBD MG</label>
                        <span className="text-sm text-[#000]font-light">{product.cbd}</span>
                    </div>
                    <div className="bg-white border border-[#DDDDDD] rounded-sm p-3">
                        <label className="block text-xs font-bold text-[#212121] underline mb-1">CBN MG</label>
                        <span className="text-sm text-[#000] font-light">{product.cbn}</span>
                    </div>
                </div>

                {/* Inventory Evaluation Section */}
                <div className='mb-2'>
                    <h3 className="text-[#000] font-bold text-sm mb-2">Inventory Evaluation</h3>
                    <hr className="border-gray-400 mb-3" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <InfoCard label="Purchase Qty" value={product.purchaseQty} subtext={`Available: ${product.availablePurchase}`} />
                        <InfoCard label="Purchase Cost" value={product.purchaseCost} subtext={`Avg. Cost: ${product.avgCost}`} />
                        <InfoCard label="Sale Price" value={product.salePrice} />
                        <InfoCard label="Discounted Price" value={product.discountedPrice} />
                    </div>
                </div>

                {/* Set Low Stock Alert Section */}
                <div className='mb-2'>
                    <h3 className="text-[#000] font-bold text-sm mb-2">Set Low Stock Alert</h3>
                    <hr className="border-gray-400 mb-2" />
                    <div className="bg-white rounded-sm border border-gray-200 p-0 w-full md:w-1/3">
                        <InfoCard label="Low Stock Alert" value={product.lowStockAlertValue} subtext={`Available: ${product.availableLowStock}`} className="border-0" />
                    </div>
                </div>

                {/* Available Stock Section */}
                <div className='mb-2'>
                    <h3 className="text-[#000] font-bold text-sm mb-1">Available Stock</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="bg-[#F3F3F3] rounded-sm border border-[#D8D8D8] p-2">
                            <p className="text-[#212121] font-bold underline text-sm mb-1">Available Quantity</p>
                            <p className="text-lg font-light text-[#212121]">{product.availableQty}</p>
                        </div>
                        <div className="bg-[#F3F3F3] rounded-sm border border-[#D8D8D8] p-2">
                            <p className="text-[#212121] font-bold underline text-sm mb-1">Available Stock Valuation</p>
                            <p className="text-lg font-light text-[#212121]">{product.availableValuation}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Field */}
                <div className="bg-white border border-gray-200 rounded-sm p-2">
                    <label className="block text-xs font-bold text-gray-900 underline mb-1">Main Image ALT</label>
                    <span className="text-sm text-[#212121]">{product.mainImageAlt}</span>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetail;
