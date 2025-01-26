"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tourguide_1 = __importDefault(require("../models/Tourguide"));
const router = express_1.default.Router();
//filter guides by price, rating, guideType, language
router.get('/guides/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minPrice, maxPrice, rating, guideType, language } = req.query;
        const query = {};
        if (minPrice || maxPrice) {
            query['price'] = {};
            if (minPrice && !isNaN(Number(minPrice))) {
                query['price']['$gte'] = Number(minPrice);
            }
            if (maxPrice && !isNaN(Number(maxPrice))) {
                query['price']['$lte'] = Number(maxPrice);
            }
        }
        // filter rating
        if (rating && !isNaN(Number(rating))) {
            query['rating'] = { $gte: Number(rating) };
        }
        //filter guideType
        if (guideType && typeof guideType === 'string') {
            query['guideType'] = guideType;
        }
        // filter language
        if (language) {
            query['languages'] = { $in: [language] };
        }
        //search for guides
        const guides = yield Tourguide_1.default.find(query);
        // return result
        if (guides.length > 0) {
            res.status(200).json({
                success: true,
                count: guides.length,
                data: guides,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'No guides found with the given criteria',
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'An error occurred while searching for guides',
            error: errorMessage,
        });
    }
}));
// get All guides
router.get('/guides', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get All tour guides
        const guides = yield Tourguide_1.default.find({});
        if (guides.length > 0) {
            res.status(200).json({
                success: true,
                count: guides.length,
                data: guides,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'No guides found',
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching guides',
            error: errorMessage,
        });
    }
}));
// get a single guide by id
router.get('/guides/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guideId = req.params.id;
        const guide = yield Tourguide_1.default.findById(guideId);
        if (guide) {
            res.status(200).json({
                success: true,
                data: guide,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Guide not found',
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the guide',
            error: errorMessage,
        });
    }
}));
//add new review To TourGuide 
router.post('/guides/:id/addReview', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guideId = req.params.id;
        const { name, image, comment, rating } = req.body;
        const guide = yield Tourguide_1.default.findByIdAndUpdate(guideId, { $push: { reviews: { name, image, comment, date: new Date(), rating } } }, { new: true });
        if (guide) {
            res.status(201).json({
                success: true,
                message: 'Review added successfully',
                data: guide,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Guide not found',
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding the review',
            error: errorMessage,
        });
    }
}));
// delete review by guide id and review id
router.delete('/guides/:guideId/review/:reviewId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { guideId, reviewId } = req.params;
        const guide = yield Tourguide_1.default.findById(guideId);
        if (!guide) {
            res.status(404).json({
                success: false,
                message: 'Guide not found',
            });
            return;
        }
        const reviewIndex = (_a = guide.reviews) === null || _a === void 0 ? void 0 : _a.findIndex((review) => review._id.toString() === reviewId);
        if (reviewIndex === -1) {
            res.status(404).json({
                success: false,
                message: 'Review not found',
            });
            return;
        }
        const updatedGuide = yield Tourguide_1.default.findByIdAndUpdate(guideId, { $pull: { reviews: { _id: reviewId } } }, { new: true });
        if (updatedGuide) {
            res.status(200).json({
                success: true,
                message: 'Review deleted successfully',
                data: updatedGuide,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Guide or review not found',
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the review',
            error: errorMessage,
        });
    }
}));
router.delete('/guides/:tourGuideId/car/:carId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { tourGuideId, carId } = req.params;
        const guide = yield Tourguide_1.default.findById(tourGuideId);
        if (!guide) {
            res.status(404).json({
                success: false,
                message: 'Guide not found',
            });
            return;
        }
        const carFound = ((_a = guide.car) === null || _a === void 0 ? void 0 : _a._id.toString()) === carId;
        if (!carFound) {
            res.status(404).json({
                success: false,
                message: 'Car not found',
            });
            return;
        }
        const updatedGuide = yield Tourguide_1.default.findByIdAndUpdate(tourGuideId, { $unset: { car: 1 } }, { new: true });
        if (updatedGuide) {
            res.status(200).json({
                success: true,
                message: 'Car deleted successfully',
                data: updatedGuide,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Guide or car not found',
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the car',
            error: errorMessage,
        });
    }
}));
exports.default = router;
