import React, { useContext } from "react";
import { Pagination as BPagination } from "react-bootstrap";
import { CoursesContext } from "../../contexts/course-context";

const Pagination: React.FC = () => {
    const { coursesPerPage, totalCourses, currentPage, paginate } = useContext(CoursesContext);
    const items = [];

    if (currentPage > 1) {
        items.push(<BPagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} />);
    }

    for (let page = 1; page <= Math.ceil(totalCourses / coursesPerPage); page++) {
        items.push(
            <BPagination.Item key={page} active={page === currentPage} onClick={() => paginate(page)}>
                {page}
            </BPagination.Item>
        );
    }

    if (currentPage < totalCourses / coursesPerPage) {
        items.push(<BPagination.Next key="next" onClick={() => paginate(currentPage + 1)} />);
    }

    return (
        <BPagination>{items}</BPagination>
    );
};

export default Pagination;