const persistencyLayer = require("../persistencyLayer.js");
const dbReviewPath = __dirname+"/../../entities/reviews.js";

function writeReview(review){
    return persistencyLayer.addObject(review,dbReviewPath);
}

function getReview (idReview){
    return persistencyLayer.getObject(idReview, dbReviewPath);
}

function getAllReview(){
    return persistencyLayer.getObjectsList(dbReviewPath);
} 

function deleteReview(idReview){
    return persistencyLayer.deleteObject(idReview, dbReviewPath);
}

function modifyReview(idReview, newObject){
    return persistencyLayer.modifyObject(idReview, dbReviewPath, newObject);
}

module.exports = {
    writeReview: writeReview,
    getAllReviews: getAllReview,
    getReview: getReview,
    deleteReview: deleteReview,
    modifyReview: modifyReview
}
