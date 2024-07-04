"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryServices = __importStar(require("./services/diaryServices"));
const utils_1 = __importDefault(require("./utils"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.get('/', (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});
app.get('/:id', (req, res) => {
    //El + ya hace el casteo al tipo de dato esperado (esta bueno pero igual es un poco rebuscado usar un signo y no una función)
    const diary = diaryServices.findById(+req.params.id);
    return (diary != undefined)
        ? res.send(diary)
        : res.sendStatus(404);
});
app.post('/', (req, res) => {
    try {
        const newDiaryEntry = (0, utils_1.default)(req.body);
        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            res.status(400).send("An unknown error occurred");
        }
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
