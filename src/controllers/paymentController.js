export const getPayments = (req, res) => {
    try {
        res.status(200).json({message: "Get Payments"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error - Controller"});
    }
}