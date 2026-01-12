import API from "./API";

const variantService = {
    fetchVariantSpecificData: async (variantId) => {
        const res = await API.get(
            `/api/v1/traceVenue/variant-simple/user/${variantId}`
        );
        return res;
    },
    fetchVariants: async (variantIds) => {
        const response = await API.post(
            `/api/v1/traceVenue/variant-simple/variant-by-ids`,
            { variantIds }
        );
        return response?.data || [];
    },
};
export default variantService;
