const {
    getCourses,
    getCoursesPaginated,
    getCourse,
    createCourseRecord,
    updateCourseRecord,
    deleteCourseRecord,
} = require("./courses.service");

function parseId(rawId) {
    const id = Number.parseInt(rawId, 10);

    return Number.isInteger(id) && id > 0 ? id : null;
}

async function listCoursesController(_req, res) {
    try {
        const courses = await getCourses();
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

function parsePositiveInt(value, fallback) {
    const parsed = Number.parseInt(value, 10);

    if (!Number.isInteger(parsed) || parsed <= 0) {
        return fallback;
    }

    return parsed;
}

async function listCoursesPaginatedController(req, res) {
    try {
        const page = parsePositiveInt(req.query.page, 1);
        const limit = Math.min(parsePositiveInt(req.query.limit, 10), 100);
        const { data, total } = await getCoursesPaginated({ page, limit });
        const totalPages = Math.max(1, Math.ceil(total / limit));

        return res.status(200).json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getCourseController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid course id" });
        }

        const course = await getCourse(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function createCourseController(req, res) {
    try {
        const { name, level } = req.body || {};

        if (!name || !level) {
            return res.status(400).json({ message: "name and level are required" });
        }

        const course = await createCourseRecord({ name, level });
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateCourseController(req, res) {
    try {
        const id = parseId(req.params.id);
        const { name, level } = req.body || {};

        if (!id) {
            return res.status(400).json({ message: "Invalid course id" });
        }

        if (!name || !level) {
            return res.status(400).json({ message: "name and level are required" });
        }

        const course = await updateCourseRecord(id, { name, level });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteCourseController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid course id" });
        }

        const deleted = await deleteCourseRecord(id);

        if (!deleted) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    listCoursesController,
    listCoursesPaginatedController,
    getCourseController,
    createCourseController,
    updateCourseController,
    deleteCourseController,
};