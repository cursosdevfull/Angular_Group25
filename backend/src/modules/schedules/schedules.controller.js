const {
    getSchedules,
    getSchedulesPaginated,
    getSchedule,
    courseExists,
    createScheduleRecord,
    updateScheduleRecord,
    deleteScheduleRecord,
} = require("./schedules.service");

function parseId(rawId) {
    const id = Number.parseInt(rawId, 10);

    return Number.isInteger(id) && id > 0 ? id : null;
}

function parsePositiveInt(value, fallback) {
    const parsed = Number.parseInt(value, 10);

    if (!Number.isInteger(parsed) || parsed <= 0) {
        return fallback;
    }

    return parsed;
}

function buildSchedulePayload(body = {}) {
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const dateStart = typeof body.dateStart === "string" ? body.dateStart : "";
    const duration = Number.parseInt(body.duration, 10);
    const price = Number.parseFloat(body.price);
    const courseId = Number.parseInt(body.courseId, 10);

    if (!title || title.length < 3) {
        return { error: "title is required and must contain at least 3 characters" };
    }

    if (!dateStart || Number.isNaN(Date.parse(dateStart))) {
        return { error: "dateStart is required and must be a valid date" };
    }

    if (!Number.isInteger(duration) || duration <= 0) {
        return { error: "duration is required and must be a positive integer" };
    }

    if (Number.isNaN(price) || price < 0) {
        return { error: "price is required and must be zero or greater" };
    }

    if (!Number.isInteger(courseId) || courseId <= 0) {
        return { error: "courseId is required and must be a valid id" };
    }

    return {
        value: {
            title,
            dateStart,
            duration,
            price,
            courseId,
        },
    };
}

async function listSchedulesController(_req, res) {
    try {
        const schedules = await getSchedules();
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function listSchedulesPaginatedController(req, res) {
    try {
        const page = parsePositiveInt(req.query.page, 1);
        const limit = Math.min(parsePositiveInt(req.query.limit, 10), 100);
        const { data, total } = await getSchedulesPaginated({ page, limit });
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

async function getScheduleController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid schedule id" });
        }

        const schedule = await getSchedule(id);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function createScheduleController(req, res) {
    try {
        const payload = buildSchedulePayload(req.body);

        if (payload.error) {
            return res.status(400).json({ message: payload.error });
        }

        const hasCourse = await courseExists(payload.value.courseId);

        if (!hasCourse) {
            return res.status(400).json({ message: "courseId does not exist" });
        }

        const schedule = await createScheduleRecord(payload.value);
        return res.status(201).json(schedule);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateScheduleController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid schedule id" });
        }

        const payload = buildSchedulePayload(req.body);

        if (payload.error) {
            return res.status(400).json({ message: payload.error });
        }

        const hasCourse = await courseExists(payload.value.courseId);

        if (!hasCourse) {
            return res.status(400).json({ message: "courseId does not exist" });
        }

        const schedule = await updateScheduleRecord(id, payload.value);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteScheduleController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid schedule id" });
        }

        const deleted = await deleteScheduleRecord(id);

        if (!deleted) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    listSchedulesController,
    listSchedulesPaginatedController,
    getScheduleController,
    createScheduleController,
    updateScheduleController,
    deleteScheduleController,
};