import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Textarea,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const REPORT_REASONS = [
  {
    value: 1,
    label: 'Explicit Content',
    description: 'Contains adult content'
  },
  {
    value: 2,
    label: 'Harassment',
    description:
      'Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.'
  },
  {
    value: 3,
    label: 'Hate',
    description:
      'Promoting hate or inciting violence based on identity or vulnerability.'
  },
  {
    value: 4,
    label: 'Impersonation',
    description:
      'Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions.'
  },
  {
    value: 5,
    label: 'Misinformation',
    description:
      'Spreading false information such as content that undermines civic processes or provides dangerous health misinformation.'
  },
  {
    value: 6,
    label: 'Self-harm or suicide',
    description:
      'Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.'
  },
  {
    value: 7,
    label: 'Sharing Personal Information',
    description:
      'Sharing or threatening to share private, personal, or confidential information about someone.'
  },
  {
    value: 8,
    label: 'Spam',
    description:
      'Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.'
  },
  {
    value: 9,
    label: 'Threatening',
    description:
      'Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.'
  }
];

const ReportContentModal = ({ opened, onClose, pkContent, contentType }) => {
  const {
    createUserPostReport,
    createCommentReport,
    createBrandReport,
    createProductReport,
    createUserReport
  } = useContext(ReviewsContext);
  const [formState, setFormState] = useState({
    fkContentReportType: null,
    extraInfo: '',
    isloading: false,
    success: false
  });

  useEffect(() => {
    if (opened && !formState.success) {
      setFormState({
        fkContentReportType: null,
        extraInfo: '',
        isloading: false,
        success: false
      });
    }
  }, [opened]);

  const onSuccess = () => {
    setFormState({
      ...formState,
      isloading: false,
      success: true
    });
  };

  const onError = message => {
    setFormState({
      ...formState,
      isloading: false
    });
    triggerNotification(message);
  };

  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={opened}
      title={
        <Title order={4}>
          {formState.success ? 'Report Received' : 'Submit a report'}
        </Title>
      }
    >
      {formState.success ? (
        <Stack sx={{ gap: 10, padding: 20 }}>
          <Text size={14} sx={{ textAlign: 'center' }} weight={500}>
            Thank you. Your Report has been received.
          </Text>
        </Stack>
      ) : formState.fkContentReportType ? (
        <Stack sx={{ gap: 10, padding: 20 }}>
          <Text size={14}>
            Thank you for looking out for your community by reporting content
            that breaks our guidelines. Let us know what's happening, and we'll
            look into it.
          </Text>
          <Textarea
            description="Have any extra info that will help us determine whats wrong?"
            label="Additional Info"
            onChange={e =>
              setFormState({
                ...formState,
                extraInfo: e.currentTarget.value
              })
            }
            value={formState.extraInfo}
          />
        </Stack>
      ) : (
        <Stack sx={{ gap: 0 }}>
          <Stack sx={{ padding: 20 }}>
            <Text sx={{ textAlign: 'center' }} weight={500}>
              Please select a reason for reporting
            </Text>
            <Stack
              sx={{
                gap: 0,
                border: 'solid 1px lightgrey',
                borderBottom: 'none'
              }}
            >
              {REPORT_REASONS.map(r => (
                <Group
                  key={r.value}
                  onClick={() =>
                    setFormState({
                      ...formState,
                      fkContentReportType: r.value
                    })
                  }
                  sx={{
                    cursor: 'pointer',
                    padding: 10,
                    borderBottom: 'solid 1px lightgrey',
                    '&:hover': {
                      border: 'solid 1px lightgrey',
                      borderBottom: 'solid 2px lightgrey',
                      padding: 9
                    }
                  }}
                >
                  <Stack sx={{ gap: 0 }}>
                    <Text size={16} sx={{ lineHeight: '18px' }} weight={500}>
                      {r.label}
                    </Text>
                    <Text color="grey" size={12} sx={{ lineHeight: '16px' }}>
                      {r.description}
                    </Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}
      <Divider />
      <Group
        sx={{
          padding: '12px 16px',
          justifyContent: formState.success ? 'center' : 'space-between'
        }}
      >
        <Button
          color="dark"
          disabled={formState.isloading}
          onClick={onClose}
          radius="xl"
          size="sm"
          styles={{ label: { padding: '0px 10px' } }}
          variant="outline"
        >
          {formState.success ? 'Close' : 'Cancel'}
        </Button>
        {formState.fkContentReportType && !formState.success && (
          <Button
            loading={formState.isloading}
            onClick={() => {
              let reportFunction;
              switch (contentType) {
                case 'brand':
                  reportFunction = createBrandReport;
                  break;
                case 'product':
                  reportFunction = createProductReport;
                  break;
                case 'comment':
                  reportFunction = createCommentReport;
                  break;
                case 'post':
                  reportFunction = createUserPostReport;
                  break;
                case 'user':
                  reportFunction = createUserReport;
                  break;
                default:
                  break;
              }
              setFormState({
                ...formState,
                isloading: true
              });
              reportFunction(pkContent, formState, onSuccess, onError);
            }}
            radius="xl"
            size="sm"
            styles={{ label: { padding: '0px 10px' } }}
            variant="filled"
          >
            Submit Report
          </Button>
        )}
      </Group>
    </ResponsiveModal>
  );
};

ReportContentModal.propTypes = {
  contentType: PropTypes.string,
  opened: PropTypes.bool,
  pkContent: PropTypes.number,
  onClose: PropTypes.func
};

export default ReportContentModal;
