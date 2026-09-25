// src/components/NoticeCard.jsx
// Announcement/notice card with a category tag.
import { formatDate } from '../utils/helpers';

const CATEGORY_CLASS = {
  'Placement Drive': 'tag tag-blue',
  Important: 'tag tag-red',
  Interview: 'tag tag-violet',
  Registration: 'tag tag-green',
  General: 'tag tag-gray',
};

export default function NoticeCard({ notice }) {
  return (
    <div className="notice-card">
      <div className="notice-top">
        <span className={CATEGORY_CLASS[notice.category] || 'tag tag-gray'}>
          {notice.category}
        </span>
        <span className="notice-date">{formatDate(notice.date)}</span>
      </div>
      <h3>{notice.title}</h3>
      <p>{notice.description}</p>
    </div>
  );
}
